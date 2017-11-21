'use strict';

/**
 * @ngdoc service
 * @name cmm.app.services.service:runService
 *
 * @param {service} $location - The AngularJS {@link $location} Location Scope
 * @param {service} $log - The AngularJS {@link $log} Logging Service
 * @param {object} AppSettings - The {@link cmm.app.object:AppSettings AppSettings} Application Settings Constant
 * @param {service} metaInformationService - The {@link cmm.app.services.service:metaInformationService metaInformationService} Meta Information Service Class
 *
 * @description
 * This is a service for the AngularJS Run() bootstrap method.  It helps keep code isolated to the Run() block testable rather than anonymous.
 */
function runService($location, $log, AppSettings, metaInformationService) {
	'ngInject';

	//******************** EXPOSED/PUBLIC METHODS ********************//
	this.locationChangeStartCallback = locationChangeStartCallback;
	this.stateChangeStartCallback = stateChangeStartCallback;
	this.stateChangeErrorCallback = stateChangeErrorCallback;
	this.stateChangeSuccessCallback = stateChangeSuccessCallback;

	//******************** FUNCTION DECLARATIONS ********************//
	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:runService#locationChangeStartCallback
	 * @methodOf cmm.app.services.service:runService
	 *
	 * @description
	 * Method that is called when the `$locationChangeStart` Event is triggered.  It's full method signature
	 * is: event, absNewUrl, absOldUrl, newState, oldState
	 */
	function locationChangeStartCallback(event) {
		$log.debug('$locationChangeStart: ', event);
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:runService#stateChangeStartCallback
	 * @methodOf cmm.app.services.service:runService
	 *
	 * @description
	 * Method that is called when the `$stateChangeStart` Event is triggered.  It's full method signature
	 * is: event, toState, toParams, fromState
	 */
	function stateChangeStartCallback(event) {
		$log.debug('$stateChangeStart: ', event);
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:runService#stateChangeErrorCallback
	 * @methodOf cmm.app.services.service:runService
	 *
	 * @description
	 * Method that is called when the `$stateChangeError` Event is triggered.  It's full method signature
	 * is: event, toState, toParams, fromState, fromParams, error
	 */
	function stateChangeErrorCallback(event, toState, toParams, fromState, fromParams, error) {
		$log.error('$stateChangeError: ', error);
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:runService#stateChangeSuccessCallback
	 * @methodOf cmm.app.services.service:runService
	 *
	 * @description
	 * Method that is called when the `$stateChangeSuccess` Event is triggered.  It's full method signature
	 * is: event, toState, toParams, fromState, fromParams
	 */
	function stateChangeSuccessCallback(event, toState) {
		$log.debug('$stateChangeSuccess toState: ', toState);

		//Check if data property exists
		toState.data = toState.data || {};

		/*---------- META TAGS ----------*/

		//Reset the Meta Information for the new State
		metaInformationService.resetMetaTags();

		//Set the Page Title from the State concatenated with a hyphen and the Application Title Constant. Set first because it is visible to customers
		metaInformationService.setTitle((toState.data.title ? `${toState.data.title} \u007C ` : '') + AppSettings.appTitle);

		//Set the Absolute Location URL
		metaInformationService.setLocation($location.absUrl());

		//Set the Page Description from the State
		metaInformationService.setMetaDescription(toState.data.description ? toState.data.description : '');

		//Set the Keywords from the State
		metaInformationService.setMetaKeywords(toState.data.keywords ? toState.data.keywords : []);
	}
}

export default {
	'name': 'runService',
	'fn': runService
};
