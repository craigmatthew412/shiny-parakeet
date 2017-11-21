'use strict';

import Utilities from '../utilities';

const bulk = require('bulk-require');

const controllers = bulk(__dirname, ['./**/!(*index|*.spec).js']);

/**
 * @ngdoc overview
 * @name cmm.app.controllers
 * @type {angular.Module}
 *
 * @description
 *
 * # Controllers Module
 * The applications Controllers module.  Any new files added to the /app/js/controllers/ directory will automatically
 * be included in this module, there is no need to manually declare them anywhere.
 */
angular.module('cmm.app.controllers', []);

/*
 * Declare the controllers
 */
new Utilities().declare(controllers, angular.module('cmm.app.controllers'), 'controller');

export default angular.module('cmm.app.controllers');
