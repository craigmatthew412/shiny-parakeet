'use strict';

/**
 * @ngdoc function
 * @name cmm.app.function:run
 *
 * @param {service} $rootScope - The AngularJS {@link $rootScope} Root Scope
 * @param {service} metaInformationService - The {@link cmm.app.services.service:metaInformationService metaInformationService} Meta Information Service
 * @param {service} runService - The {@link cmm.app.services.service:runService runService} Run Service
 *
 * @description
 * Run Block which behaves as an instance-injector and gets executed after the injector is created.  Only Instances (Services, Factories, Filters, etc.)
 * and Constants can be injected into this method.  It is executes after all instances have been configured and the injector has been created (Configuration Block Phase).  It is
 * meant to perform any actions which are necessary to kick-start the application and often contain code that is difficult to unit-test.
 */
function run($rootScope, metaInformationService, runService) {
	'ngInject';

	/*
	 * #Location Change Start
	 */
	$rootScope.$on('$locationChangeStart', runService.locationChangeStartCallback);

	/*
	 * #State Change Start
	 */
	$rootScope.$on('$stateChangeStart', runService.stateChangeStartCallback);

	/*
	 * #State Change Error
	 */
	$rootScope.$on('$stateChangeError', runService.stateChangeErrorCallback);

	/*
	 * #State Change Success
	 */
	$rootScope.$on('$stateChangeSuccess', runService.stateChangeSuccessCallback);

	/*
	 * #Set the MetaInformation Service to be available on the View
	 */
	$rootScope.metaInformationService = metaInformationService;
}

export default run;
