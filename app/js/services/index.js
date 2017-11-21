'use strict';

import Utilities from '../utilities';

const bulk = require('bulk-require');

const services = bulk(__dirname, ['./**/!(*index|*.spec).js']);

/**
 * @ngdoc overview
 * @name cmm.app.services
 * @type {angular.Module}
 *
 * @description
 *
 * # Services Module
 * The applications Services module.  Any new files added to the /app/js/services/ directory will automatically
 * be included in this module, there is no need to manually declare them anywhere.
 */
angular.module('cmm.app.services', []);

/*
 * Declare the services
 */
new Utilities().declare(services, angular.module('cmm.app.services'), 'service');

export default angular.module('cmm.app.services');
