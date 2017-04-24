/**
 * this is your configuration file defaults.
 *
 * You can create additional configuration files to that the server will load based on your
 * environment.  For example, if you want to have specific settings for production which are different
 * than your local development environment, you can create a production.js and a local.js.  Any changes
 * in those files will overwrite changes to this file (a object merge is performed). By default, your
 * local.js file will not be commited to git or the registry.
 *
 * This is a JavaScript file (instead of JSON) so you can also perform logic in this file if needed.
 */
module.exports = {
	// these are your generated API keys.  They were generated uniquely when you created this project.
	// DO NOT SHARE these keys with other projects and be careful with these keys since they control
	// access to your API using the default configuration.  if you don't want two different keys for
	// production and test (not recommended), use the key 'apikey'.  To simulate running in production,
	// set the environment variable NODE_ENV to production before running such as:
	//
	// NODE_ENV=production appc run
	//
	// production key, this is the key that will be required when you are running in production
	apikey_production: 'B0pV010F6YsxOlShvqnPIq50guqxi4zo',
	// development key, this is the key that will be required when you are testing non-production (such as locally)
	apikey_development: '20pbJgmqIh5s4hWqLo43l8qZi0GVyJh1',
	// preproduction key, this is the key that will be required when you are testing non-production (such as locally)
	apikey_preproduction: 'Hj2C9vlu5T6AvoEY98K9VdtKilarPObA',

	// by default the authentication strategy is 'basic' which will use HTTP Basic Authorization where the
	// usename is the key and the password is blank.  the other option is 'apikey' where the value of the
	// APIKey header is the value of the key.  you can also set this to 'plugin' and define the key 'APIKeyAuthPlugin'
	// which points to a file or a module that implements the authentication strategy
	APIKeyAuthType: 'basic',

	// The number of milliseconds before timing out a request to the server.
	timeout: 120000,

	// logging configuration
	logLevel: 'debug', // Log level of the main logger.
	logging: {
		// location of the logs if enabled
		logdir: './logs',
		// turn on transaction logs
		transactionLogEnabled: true,
		// turn on adi logging of transaction logs
		adiLogging: false
	},

	// prefix to use for apis
	apiPrefix: '/api',

	// control the settings for the admin website
	admin: {
		// control whether the admin website is available
		enabled: true,
		// the prefix to the admin website
		prefix: '/arrow',
		// the prefix for the public apidocs website
		apiDocPrefix: '/apidoc',
		// if you set disableAuth, in production only your API docs will show up
		disableAuth: false,
		// if you set disableAPIDoc, your API docs will not show up (regardless of disableAuth)
		disableAPIDoc: false,
		// if you set disableDefault404, API Builder Tools will not register a default 404 handler
		disableDefault404: false,
		// set to true to allow the admin website to be accessed in production. however, you will still need a
		// login unless disableAuth is false. if you set this to false, the admin website will not be enabled
		// when in production (still respects enabled above)
		enableAdminInProduction: false,
		// The hostnames or IPs from which connections to admin are allowed. Hostnames must be resolvable on the
		// server. IP ranges can also be specified. e.g. [ 'localhost', '192.168.1.0/24', '10.1.1.1' ]
		// An empty list [] will allow unrestricted access, though this is not recommended due to security concerns.
		allowedHosts: [
			'localhost'
		]
	},

	// you can generally leave this as-is since it is generated for each new project you created.
	session: {
		encryptionAlgorithm: 'aes256',
		encryptionKey: '3tET5HfF17/7/upeMjtmsub0xFPdahb2f3RnFRYFHoA=',
		signatureAlgorithm: 'sha512-drop256',
		signatureKey: 'ZkrrTdZk6IHz7hXHDkmEN1P2oxXcgqBjjh/B01dbOHWxA8MLdqkEV7tT6pF+eYudyhvLazqgoI/PvfHLDkoHPA==',
		secret: 't+ML3C9Yre/gHhp4W0r6ApgZG0ACpCwU', // should be a large unguessable string
		duration: 86400000, // how long the session will stay valid in ms
		activeDuration: 300000 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
	},

	// if you want signed cookies, you can set this value. if you don't want signed cookies, remove or make null
	cookieSecret: 'vVTSGc7S44Ka8JEdwJIpbNOApgmUbkPg',

	serialization: {
		// Here for backwards compatibility with older arrow apps. When you set this to
		// true, a model's primary key will always be exposed under 'id' instead of it's
		// actual name
		exposePrimaryKeyAsId: false
	},

	// your connector configuration goes here
	connectors: {
	},

	// the date and time format to be used for admin-ui. Default is 'yyyy:mm:dd, HH:MM:ss.l'
	// reference: https://github.com/felixge/node-dateformat
	dateTimeFormat: 'yyyy-mm-dd, HH:MM:ss.l'
};
