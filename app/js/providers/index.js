'use strict';

import Utilities from '../utilities';

const bulk = require('bulk-require');

const providers = bulk(__dirname, ['./**/!(*index|*.spec).js']);

/**
 * @ngdoc overview
 * @name cmm.app.providers
 * @type {angular.Module}
 *
 * @description
 *
 * # Providers Module
 * The applications Providers module.  Any new files added to the /app/js/providers/ directory will automatically
 * be included in this module, there is no need to manually declare them anywhere.
 */
angular.module('cmm.app.providers', []);

/*
 * Declare the providers
 */
new Utilities().declare(providers, angular.module('cmm.app.providers'), 'provider');

export default angular.module('cmm.app.providers');
