'use strict';

import Utilities from '../utilities';

const bulk = require('bulk-require');

const filters = bulk(__dirname, ['./**/!(*index|*.spec).js']);

/**
 * @ngdoc overview
 * @name cmm.app.filters
 * @type {angular.Module}
 *
 * @description
 *
 * # Filters Module
 * The applications Filters module.  Any new files added to the /app/js/filters/ directory will automatically
 * be included in this module, there is no need to manually declare them anywhere.
 */
angular.module('cmm.app.filters', []);

/*
 * Declare the directives
 */
new Utilities().declare(filters, angular.module('cmm.app.filters'), 'filter');

export default angular.module('cmm.app.filters');
