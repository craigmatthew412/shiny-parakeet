'use strict';

import constants from './constants';
import environment from './environment';
import config from './config';
import run from './run';
import './filters';
import './controllers';
import './services';
import './providers';
import './directives';

/**
 * @ngdoc overview
 * @name cmm.app
 * @module cmm.app
 *
 * @requires cmm.app.filters
 * @requires cmm.app.controllers
 * @requires cmm.app.services
 * @requires cmm.app.providers
 * @requires cmm.app.directives
 *
 * @description
 *
 * # App Module
 * The main application module definition.  All required module dependencies are injected here, as well as any
 * configuration or runtime functions.  It is mounted on the global window for e2e testing purposes.
 */
window.cmmapp = angular.module('cmm.app', [
	'ui.router',
	'templates',
	'cmm.app.filters',
	'cmm.app.controllers',
	'cmm.app.services',
	'cmm.app.providers',
	'cmm.app.directives'
]);

/*
 * Define the AppSettings Constant
 */
angular.module('cmm.app').constant('AppSettings', constants);

/*
 * Define the EnvironmentSettings Constant
 */
angular.module('cmm.app').constant('EnvironmentSettings', environment);

/*
 * Define the Configuration Block
 */
angular.module('cmm.app').config(config);

/*
 * Define the Run Block
 */
angular.module('cmm.app').run(run);

/*
 * Manually bootstraps the AngularJS application to the specified Element.  In our case, we want to bootstrap the entire Document so that we have
 * control over everything.  We also want to specify Strict Dependency Injection which helps prevent exceptions after code has been minified for
 * deployment and ensures that everything can be property injected.
 *
 * Configuration for bootstrap would use the strictDi property: `{'strictDi': true}`
 */
angular.bootstrap(document, ['cmm.app'], {
	'strictDi': true
});
