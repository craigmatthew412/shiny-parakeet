'use strict';

/**
 * @ngdoc object
 * @name cmm.app.object:AppSettings
 *
 * @description
 * Applies an application-wide constants definition using the name 'AppSettings'.  Only settings which are application-wide regardless of environment
 * or business chain should go here.
 */
const AppSettings = {};

/**
 * @ngdoc property
 * @name cmm.app.object:AppSettings#appTitle
 * @propertyOf cmm.app.object:AppSettings
 * @type {string}
 *
 * @description
 * This contains the title of the application.  It can be used anywhere, but most commonly for use in the `<title>` tag
 * in the `<header>` of the HTML document.
 */
AppSettings.appTitle = 'Example Application';

/**
 * @ngdoc property
 * @name cmm.app.object:AppSettings#maxApiRetries
 * @propertyOf cmm.app.object:AppSettings
 * @type {number}
 *
 * @description
 * This determines the default maximum number of consecutive retries for a given API when a HTTP Response Error has been
 * caught.  This will only be used as a fallback if the `maxRetries` property is not present on a given `$http` config.
 */
AppSettings.maxApiRetries = 3;

export default AppSettings;
