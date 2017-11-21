'use strict';

const istanbul = require('browserify-istanbul');
const isparta = require('isparta');

const karmaBaseConfig = {
	'basePath': '../',

	'singleRun': true,

	'frameworks': ['jasmine', 'browserify'],

	'preprocessors': {
		'app/js/**/*.js': ['browserify', 'coverage'],
		'test/**/*.js': ['browserify']
	},

	'browsers': ['Chrome'],

	'reporters': ['progress', 'coverage'],

	'autoWatch': false,

	'browserify': {
		'debug': true,
		'extensions': ['.js'],
		'transform': [
			'babelify',
			'browserify-ngannotate',
			'bulkify',
			istanbul({
				'instrumenter': isparta,
				'instrumenterConfig': {
					'embedSource': true
				},
				'ignore': ['**/bower_components/**', '**/node_modules/**', '**/test/**', '**/app/js/templates.js']
			})
		]
	},

	'coverageReporter': {
		'type': 'html',
		'dir': 'coverage/'
	},

	'colors': true,

	'client': {
		'captureConsole': true
	},

	//'customContextFile': './test/custom.context.html',

	'logLevel': 'LOG_DEBUG',

	'proxies': {
		//'/context.js': '/base/node_modules/karma/static/context.js',
		'/': 'http://localhost:9876/'
	},

	'urlRoot': '/__karma__/',

	'files': [

		//app-specific code
		'app/js/vendor.js',
		'app/js/templates.js',
		'app/js/app.js',

		//3rd-party resources
		'node_modules/angular-mocks/angular-mocks.js',

		//Karma files
		//'node_modules/karma/static/context.js',

		//test files
		'test/unit/**/*.js'
	]
};

const customLaunchers = {
	'chrome': {
		'base': 'SauceLabs',
		'browserName': 'chrome'
	}
};

const ciAdditions = {
	'sauceLabs': {
		'testName': 'Karma Unit Tests',
		'startConnect': false,
		'build': process.env.TRAVIS_BUILD_NUMBER,
		'tunnelIdentifier': process.env.TRAVIS_JOB_NUMBER
	},
	'browsers': Object.keys(customLaunchers),
	'customLaunchers': customLaunchers,
	'reporters': ['progress', 'coverage', 'saucelabs']
};

module.exports = function configureKarma(config) {
	const isCI = process.env.CI && Boolean(process.env.TRAVIS_PULL_REQUEST);

	config.set(isCI ? Object.assign(karmaBaseConfig, ciAdditions) : karmaBaseConfig);
};
