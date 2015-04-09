var _ = require('lodash'),
	async = require('async'),
	crypto = require('crypto'),
	pkginfo = require('pkginfo')(module) && module.exports,
	fs = require('fs'),
	box = require('box-view');

// Valid endpoints for this connector
var endpoints = {
	documents: true,
	sessions: true
};

// --------- appc.box connector -------
exports.create = function(Arrow, server) {
	var Connector = Arrow.Connector,
		Collection = Arrow.Collection,
		Instance = Arrow.Instance;

	// return a Connector Class
	return Connector.extend({
		/*
		 Configuration.
		 */
		pkginfo: _.pick(pkginfo, 'name', 'version', 'description', 'author', 'license', 'keywords', 'repository'),
		logger: server && server.logger || Arrow.createLogger({}, { name: pkginfo.name }),
		sendEmptyResponse: false, // Needed for creating the view sessions

		// if you need to do this dynamically to load models, call this method after connect but before your callback
		// and set the models value on your connector instance
		models: null,

		/*
		 Lifecycle.
		 */
		constructor: function() {

		},
		/**
		 * called during connector factory after construction before returning the connector instance
		 */
		postCreate: function() {
		},
		/**
		 * this method is called before the server starts to allow the connector to connect to any external
		 * resources if necessary (such as a Database, etc.).
		 * @param next
		 */
		connect: function(next) {
			if (this.config.enabled === false) {
				return next();
			}

			if (!this.config.apiKey) {
				return next(new Error('Missing required apiKey.  Make sure you add your configuration to your config file in ./conf'));
			}

			this.connection = box.createClient(this.config.apiKey);

			this.models = Arrow.loadModelsForConnector(pkginfo.name, module);

			next();
		},
		/**
		 * Checks to see if a request will require a login.
		 */
		loginRequired: function(request, next) {
			next(null, true);
		},
		/**
		 * Attempts a login for the provided request.
		 */
		login: function(request, response, next) {
			return next();
		},
		/**
		 * this method is called before shutdown to allow the connector to cleanup any resources
		 * @param callback
		 */
		disconnect: function(callback) {
			this.logger.debug('disconnecting');
			this.logger.debug('disconnected');
			callback();
		},

		/*
		 Metadata.
		 */

		/**
		 * Provides metadata to be used to validate the config.
		 * @param callback
		 */
		fetchMetadata: function(callback) {
			callback(null, {
				fields: [
					Arrow.Metadata.Text({
						name: 'apiKey',
						description: 'Box View apiKey',
						required: true
					})
				]
			});
		},
		/**
		 * Called before your connect to allow you to specify additional configuration, or mutate the configuration,
		 * before validation and connection. This is optional.
		 * @param callback
		 */
		fetchConfig: function(callback) {
			callback(null, this.config);
		},
		fetchSchema: function (next) {
			// schemaless
			next(null, {});
		},

		/*
		 CRUD
		 */
		create: function (Model, values, callback) {
			var endpoint = Model.metadata['appc.box'].endpoint;

			if(!endpoints[endpoint]) {
				return callback(new Error('Endpoint ' + endpoint + ' is not a valid endpoint for Box.  Please use a valid endpoint in the model metadata.'));
			}

			var method, file;

			if (values.url) {
				method = 'uploadURL';
				file = values.url;
				delete values.url;
			} else if (values.file) {
				method = 'uploadFile';
				file = values.file;
				delete values.file;
			} else if (endpoint === 'sessions') {
				if(!values.doc_id) {
					callback(new Error('Missing required doc_id field'));
				}

				method = 'create';
				file = values.doc_id;
				values = {};
			} else {
				return callback(new Error('Missing a file or url field.'));
			}

			this.connection[endpoint][method](file, values, function (err, data) {
				if (err) {
					callback(err);
				} else {
					if (endpoint === 'sessions' && data[0]) {
						data = data[0];
					}
					
					var instance = Model.instance(data, true);
					instance.setPrimaryKey(data.id);
					
					callback(null, instance);
				}
			});
		},
		findAll: function (Model, callback) {
			var endpoint = Model.metadata['appc.box'].endpoint;

			if(!endpoints[endpoint]) {
				return callback(new Error('Endpoint ' + endpoint + ' is not a valid endpoint for Box.  Please use a valid endpoint in the model metadata.'));
			}

			this.connection[endpoint].list(function (err, data) {
				if(err) {
					callback(err);
				} else {
					var rows = [];
					data.document_collection.entries.forEach(function (row) {
						var instance = Model.instance(row, true);
						instance.setPrimaryKey(row.id);
						rows.push(instance);
					});

					callback(null, new Collection(Model, rows));
				}
			});
		},
		findOne: function (Model, id, callback) {
			var endpoint = Model.metadata['appc.box'].endpoint;

			if(!endpoints[endpoint]) {
				return callback(new Error('Endpoint ' + endpoint + ' is not a valid endpoint for Box.  Please use a valid endpoint in the model metadata.'));
			}

			this.connection[endpoint].get(id, function (err, data) {
				if(err) {
					callback(err);
				} else {
					var instance = Model.instance(data, true);
					instance.setPrimaryKey(data.id);

					callback(null, instance);
				}
			});
		},
		save: function (Model, instance, callback) {
			var endpoint = Model.metadata['appc.box'].endpoint;

			if(!endpoints[endpoint]) {
				return callback(new Error('Endpoint ' + endpoint + ' is not a valid endpoint for Box.  Please use a valid endpoint in the model metadata.'));
			}

			var payload = instance.toPayload();
			var id = instance.getPrimaryKey();
			
			this.connection[endpoint].update(id, payload, function (err, data) {
				if(err) {
					callback(err);
				} else {
					var instance = Model.instance(data, true);
					instance.setPrimaryKey(data.id);

					callback(null, instance);
				}
			});
		},
		'delete': function (Model, instance, callback) {
			var endpoint = Model.metadata['appc.box'].endpoint;

			if(!endpoints[endpoint]) {
				return callback(new Error('Endpoint ' + endpoint + ' is not a valid endpoint for Box.  Please use a valid endpoint in the model metadata.'));
			}

			var id = instance.getPrimaryKey();

			this.connection[endpoint].delete(id, function (err, resp) {
				if(err) {
					callback(err);
				} else {
					callback(null, instance);
				}
			});
		},
		query: function (Model, options, callback) {
			var endpoint = Model.metadata['appc.box'].endpoint;

			if(!endpoints[endpoint]) {
				return callback(new Error('Endpoint ' + endpoint + ' is not a valid endpoint for Box.  Please use a valid endpoint in the model metadata.'));
			}
			
			// Warn that the other query options are not implemented.
			if (options.page !== 1 || options.per_page !== 10 || options.skip !== 0 || options.limit !== 10 || options.sel || options.unsel || options.order) {
				this.logger.warn('page, per_page, skip, limit, sel, unsel and order have not been implemented by this connector!');
			}

			// Make sure the required query params are specified
			if((options.where.content || options.where.thumbnails) && !options.where.id) {
				return callback(new Error('Query when using content / thumbnails require a document ID to be passed in the where object'));
			}

			function cb(err, res) {
				if(err) {
					callback(err);
				} else {
					// res.pipe(fs.createWriteStream('./doc' + id + '.zip'))

					var instance = Model.instance({
						id: id,
						content: '' // TODO need to handle this properly
					}, true);

					instance.setPrimaryKey(id);

					callback(null, instance);
				}
			}

			var method, id;

			if (options.where.content) {
				id = options.where.id;
				method = 'getContent';

				this.connection[endpoint][method](id, cb);
			} else if (options.where.thumbnails) {
				id = options.where.id;
				method = 'getThumbnail';

				if(!options.where.width || !options.where.height) {
					return callback(new Error('width / height properties required in the where object.'));
				}

				this.connection[endpoint][method](id, options.where.width, options.where.height, cb);
			}
		}
	});
};
