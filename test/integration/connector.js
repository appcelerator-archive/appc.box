var should = require('should'),
	assert = require('assert'),
	async = require('async'),
	request = require('request'),
	Arrow = require('arrow'),
	server = new Arrow(),
	fs = require('fs'),
	connector = server.getConnector('appc.box');

// So we use the same model instance in multiple tests
var createdDocument, currentSession;

describe('Connector', function(next) {
	beforeEach(function() {
		this.timeout = 50000;
		setTimeout(next, 5000);
	})

	before(function(next) {
		server.start(function (err) {
			assert.ifError(err);
			next();
		});
	});

	after(function(next) {
		next();
	});

	it('should be able to fetch metadata', function(next) {
		connector.fetchMetadata(function(err, meta) {
			should(err).be.not.ok;
			should(meta).be.an.object;
			should(Object.keys(meta)).containEql('fields');
			next();
		});
	});

	it('should be able to fetch schema', function(next) {
		connector.fetchSchema(function(err, schema) {
			should(err).be.not.ok;
			should(schema).be.an.Object;
			next();
		});
	});

	it('Should be able to create document via URL', function(next) {
		var model = Arrow.getModel('appc.box/documents');

		model.create({
			url: 'https://training.appcelerator.com/assets/datasheet/tcd-certification-objectives.pdf'
		}, function(err, instance) {
			should(err).be.not.ok;
			should(instance).be.an.Object;

			createdDocument = instance;

			next();
		});
	});

	it('Should be able to create document via file upload', function(next) {
		var model = Arrow.getModel('appc.box/documents');

		model.create({
			file: fs.createReadStream(__dirname + '/files/file.pdf')
		}, function(err, instance) {
			should(err).be.not.ok;
			should(instance).be.an.Object;

			instance.delete(next);
		});
	});

	it('Should be able to findAll documents', function(next) {
		var model = Arrow.getModel('appc.box/documents');

		model.findAll(function(err, data) {
			should(err).be.not.ok;
			should(data).be.an.Array;

			next();
		});
	});

	it('Should be able to findOne document', function(next) {
		var model = Arrow.getModel('appc.box/documents');

		model.findOne(createdDocument.getPrimaryKey(), function(err, data) {
			should(err).be.not.ok;
			should(data).be.an.Object;

			next();
		});
	});

	it('Should be able to update document', function(next) {
		var model = Arrow.getModel('appc.box/documents');

		model.findOne(createdDocument.getPrimaryKey(), function(err, instance) {
			should(err).be.not.ok;
			should(instance).be.an.Object;

			instance.set('name', 'Test Document');

			instance.save(function(saveErr, savedRecord) {
				should(saveErr).be.not.ok;
				should(savedRecord).be.an.Object;
				should(savedRecord.name).be.equal('Test Document');

				next();
			});
		});
	});

	it('Should be able to create a session', function(next) {
		var model = Arrow.getModel('appc.box/sessions');

		model.create({
			doc_id: createdDocument.getPrimaryKey()
		}, function(err, instance) {
			should(err).be.not.ok;
			should(instance).be.an.Object;
			console.dir(arguments);
			currentSession = instance;

			next();
		});
	});

	it('Should be able to delete a session', function(next) {
		currentSession.delete(function(err, instance) {
			should(err).be.not.ok;
			should(instance).be.an.Object;

			next();
		});
	});

	it('Should be able to delete document by ID', function(next) {
		createdDocument.delete(function(err, instance) {
			should(err).be.not.ok;
			should(instance).be.an.Object;

			next();
		});
	});
});
