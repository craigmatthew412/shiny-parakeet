'use strict';

/**
 * @ngdoc service
 * @name cmm.app.services.service:utilityService
 *
 * @param {service} $log - The AngularJS {@link $log} Logging Service
 *
 * @description
 * This is a utility service for common methods across the application agnostic of business functionality.
 */
function utilityService($log) {
	'ngInject';

	//******************** EXPOSED/PUBLIC METHODS ********************//
	this.generateUUID = generateUUID;
	this.isTruthy = isTruthy;

	//******************** FUNCTION DECLARATIONS ********************//
	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:utilityService#generateUUID
	 * @methodOf cmm.app.services.service:utilityService
	 *
	 * @returns {string} A RFC4122 v4 UUID/GUID string
	 *
	 * @description
	 * Method that generates a high-fidelity UUID/GUID. It uses an NPM module `node-uuid` to generate a RFC4122 v4
	 * UUID/GUID string.
	 */
	function generateUUID() {
		$log.debug('utilityService.generateUUID -- ENTER');

		const generatedUuid = uuid.v4();

		$log.debug('utilityService.generateUUID -- UUID: ', generatedUuid);
		$log.debug('utilityService.generateUUID -- EXIT');

		//Return UUID/GUID
		return generatedUuid;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:utilityService#isTruthy
	 * @methodOf cmm.app.services.service:utilityService
	 *
	 * @param {boolean|string|number|*} inArgument - The argument to determine whether "truthy" or not
	 * @returns {boolean} Whether or not the argument is "truthy"
	 *
	 * @description
	 * Method that checks whether a given argument is "truthy" which means it will check multiple types and values which
	 * would evaluate to `true`. It will return `false` by default.  NOTE: We use lodash to check for Integer instead of
	 * Number because `Number.MAX_VALUE` and `Infinity` would both return `true` for `lodash.isNumber()` when we are strictly
	 * checking for the argument to equal the Integer "1", so this helps avoid an unnecessary check.
	 */
	function isTruthy(inArgument) {
		$log.debug('utilityService.isTruthy -- ENTER');
		$log.debug('utilityService.isTruthy -- Checking argument: ', inArgument);

		//Default flag to false
		let returnBoolean = false;

		//Test for String
		if (lodash.isString(inArgument)) {
			//Normalize the String
			inArgument = inArgument.toLowerCase().trim();

			//Check the value
			if (inArgument === 'true') {
				returnBoolean = true;
			}
			else if (inArgument === 'yes') {
				returnBoolean = true;
			}
			else if (inArgument === 'y') {
				returnBoolean = true;
			}
			else if (inArgument === '1') {
				returnBoolean = true;
			}
		}

		//Test for Boolean
		else if (lodash.isBoolean(inArgument)) {
			//Check the value
			returnBoolean = inArgument === true;
		}

		//Test for Integer
		else if (lodash.isInteger(inArgument)) {
			//Check the value
			returnBoolean = inArgument === 1;
		}

		$log.debug('utilityService.isTruthy -- Argument value is: ', returnBoolean);
		$log.debug('utilityService.isTruthy -- EXIT');

		//Return flag
		return returnBoolean;
	}
}

export default {
	'name': 'utilityService',
	'fn': utilityService
};
