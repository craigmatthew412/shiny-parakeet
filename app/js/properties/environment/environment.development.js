'use strict';

/**
 * @ngdoc object
 * @name cmm.app.object:EnvironmentSettings
 *
 * @description
 * Applies an environment specific constants definition using the name 'EnvironmentSettings'.  Only settings which are
 * applicable to this specific environment should go here.
 */
const EnvironmentSettings = {};

/**
 * @ngdoc property
 * @name cmm.app.object:EnvironmentSettings#apiUrls
 * @propertyOf cmm.app.object:EnvironmentSettings
 * @type {object}
 *
 * @description
 * This contains API URLs for the application.  Included API URLs include: Node.js base URL
 */
EnvironmentSettings.apiUrls = {
	'nodeBaseUrl': '/api/',
	'randomBaseUrl': '/api/v1',
	'randomBaseUrl2': '/api/v2'
};

/**
 * @ngdoc property
 * @name cmm.app.object:EnvironmentSettings#debugMode
 * @propertyOf cmm.app.object:EnvironmentSettings
 * @type {boolean}
 *
 * @description
 * This is a flag which determines whether or not "debug mode" should be enabled.  This will either enabled or disable
 *
 */
EnvironmentSettings.debugMode = true;

export default EnvironmentSettings;
