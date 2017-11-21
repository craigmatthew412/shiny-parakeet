'use strict';

//noinspection JSAnnotator
export default {
	'browserPort': 3000,
	'UIPort': 3001,
	'testPort': 3002,

	'sourceDir': './app/',
	'buildDir': './dist_bundle/',

	'styles': {
		'src': 'app/styles/**/*.scss',
		'dest': 'dist_bundle/css',
		'prodSourcemap': true,
		'sassIncludePaths': []
	},

	'scripts': {
		'src': 'app/js/**/*.js',
		'dest': 'dist_bundle/js',
		'test': 'test/**/*.js',
		'gulp': 'gulp/**/*.js'
	},

	'images': {
		'src': 'app/images/**/*',
		'dest': 'dist_bundle/images'
	},

	'fingerprint': {
		'scripts': {
			'application': {
				'src': ['dist_bundle/js/app.js', 'dist_bundle/js/app.js.map'],
				'clean': {
					'revision': 'dist_bundle/js/app-*.js*',
					'manifest': 'dist_bundle/js/app-rev-*'
				},
				'manifest': 'app-rev-manifest.json',
				'replace': ['dist_bundle/js/app-*.js*']
			},
			'templates': {
				'src': ['dist_bundle/js/templates.js', 'dist_bundle/js/templates.js.map'],
				'clean': {
					'revision': 'dist_bundle/js/templates-*.js*',
					'manifest': 'dist_bundle/js/templates-rev-*'
				},
				'manifest': 'templates-rev-manifest.json',
				'replace': ['dist_bundle/js/templates-*.js*']
			},
			'vendor': {
				'src': ['dist_bundle/js/vendor.js', 'dist_bundle/js/vendor.js.map'],
				'clean': {
					'revision': 'dist_bundle/js/vendor-*.js*',
					'manifest': 'dist_bundle/js/vendor-rev-*'
				},
				'manifest': 'vendor-rev-manifest.json',
				'replace': ['dist_bundle/js/vendor-*.js*']
			}
		},
		'styles': {
			'src': ['dist_bundle/css/main.css'],
			'clean': {
				'revision': 'dist_bundle/css/main-*.css*',
				'manifest': 'dist_bundle/css/rev-*'
			},
			'replace': ['dist_bundle/css/main-*.css*']
		}
	},

	'fonts': {
		'src': ['app/fonts/**/*', 'bower_components/bootstrap-sass/assets/fonts/**/*', 'bower_components/font-awesome-sass/assets/fonts/**/*'],
		'dest': 'dist_bundle/fonts'
	},

	'inject': {
		'src': ['dist_bundle/index.html'],
		'dest': 'dist_bundle',
		'scripts': {
			'application': {
				'src': 'dist_bundle/js/app-*.js',
				'tag': '<!-- inject:app:js -->',
				'ignore': '/dist_bundle/'
			},
			'templates': {
				'src': 'dist_bundle/js/templates-*.js',
				'tag': '<!-- inject:templates:js -->',
				'ignore': '/dist_bundle/'
			},
			'vendor': {
				'src': 'dist_bundle/js/vendor-*.js',
				'tag': '<!-- inject:vendor:js -->',
				'ignore': '/dist_bundle/'
			},
			'analytics': {
				'src': {
					'qa': undefined,
					'production': undefined
				},
				'tag': '<!-- inject:analytics:js -->',
				'ignore': '/dist_bundle/'
			}
		},
		'styles': {
			'src': 'dist_bundle/css/main-*.css',
			'tag': '<!-- inject:main:css -->',
			'ignore': '/dist_bundle/'
		}
	},

	'jsdoc': {
		'src': 'app/js/**/*.js',
		'dest': 'docs',
		'configs': {
			'tags': {
				'allowUnknownTags': true
			},
			'opts': {
				'destination': './docs',
				'package': './package.json',
				'readme': './README.md',
				'template': 'node_modules/angular-jsdoc/angular-template'
			},
			'plugins': [
				'plugins/markdown',
				'plugins/summarize',
				'node_modules/angular-jsdoc/common/plugins/ngdoc'
			],
			'templates': {
				'cleverLinks': true,
				'monospaceLinks': true,
				'theme': 'paper',
				'linenums': true,
				'outputSourceFiles': true
			}
		}
	},

	'libraries': {
		'src': ['app/libraries/*'],
		'dest': 'libraries/'
	},

	'properties': {
		'environment': {
			'src': 'app/js/properties/environment/',
			'dest': 'environment.js'
		},
		'dest': 'app/js/'
	},

	'assetExtensions': [
		'js',
		'css',
		'png',
		'jpe?g',
		'gif',
		'svg',
		'eot',
		'otf',
		'ttc',
		'ttf',
		'woff2?',
		'map',
		'html'
	],

	'views': {
		'index': 'app/index.html',
		'src': 'app/views/**/*.html',
		'testSrc': 'app/js/templates.js',
		'dest': {
			'fingerprint': 'dist_bundle/js/',
			'test': 'app/js/'
		}
	},

	'gzip': {
		'src': 'dist_bundle/**/*.{html,xml,json,css,js,js.map,css.map}',
		'dest': 'dist_bundle/',
		'options': {}
	},

	'browserify': {
		'bundleName': 'app.js',
		'prodSourcemap': false,
		'vendor': {
			'angular-core': {
				'entries': './app/js/vendor-angular-core.js',
				'file': 'vendor-angular-core.js'
			},
			'angular-other': {
				'entries': './app/js/vendor-angular-other.js',
				'file': 'vendor-angular-other.js'
			},
			'other': {
				'entries': './app/js/vendor-other.js',
				'file': 'vendor-other.js'
			}
		}
	},

	'test': {
		'karma': 'test/karma.conf.js',
		'protractor': 'test/protractor.conf.js'
	},

	'init': function init() {
		this.views.watch = [
			this.views.index,
			this.views.src
		];

		return this;
	}
}.init();
