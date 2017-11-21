'use strict';

import Utilities from '../utilities';

const bulk = require('bulk-require');

const directives = bulk(__dirname, ['./**/!(*index|*.spec).js']);

/**
 * @ngdoc overview
 * @name cmm.app.directives
 * @type {angular.Module}
 *
 * @description
 *
 * # Directives Module
 * The applications Directives module.  Any new files added to the /app/js/directives/ directory will automatically
 * be included in this module, there is no need to manually declare them anywhere.
 */
angular.module('cmm.app.directives', []);

/*
 * Declare the directives
 */
new Utilities().declare(directives, angular.module('cmm.app.directives'), 'directive');

export default angular.module('cmm.app.directives');
