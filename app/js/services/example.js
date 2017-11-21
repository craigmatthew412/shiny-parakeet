'use strict';

/**
 * @ngdoc service
 * @name cmm.app.services.service:exampleService
 *
 * @param {service} $http - The AngularJS {@link $http} HTTP Service
 * @param {service} $log - The AngularJS {@link $log} Logging Service
 * @param {service} $q - The AngularJS {@link $q} Q (Deferred/Promise APIs) Service
 * @param {service} $rootScope - The AngularJS {@link $rootScope} Root Scope
 * @param {service} $timeout - The AngularJS {@link $timeout} Timeout Service
 * @param {object} EnvironmentSettings - The {@link EnvironmentSettings} Environment Settings Constant
 *
 * @description
 * Here is a description for the Example Service.  It should use a Host Object to hold all of its public functions.
 *
 * NOTE: The $rootScope is injected into this service. Please only do so out of absolute necessity such as for listening
 * for or triggering/firing Events, or for using `$watch` or `$watchCollection`.
 */
function exampleService($http, $log, $q, $rootScope, $timeout, EnvironmentSettings) {
	'ngInject';

	//******************** PRIVATE PROPERTIES ********************//
	/**
	 * @ngdoc property
	 * @name cmm.app.services.service:exampleService#sampleStringProperty
	 * @propertyOf cmm.app.services.service:exampleService
	 * @type {string}
	 *
	 * @description
	 * This is a property on a service which is private
	 */
	const sampleStringProperty = 'I am a sample private Property!';

	//******************** EXPOSED/PUBLIC PROPERTIES ********************//
	/**
	 * @ngdoc property
	 * @name cmm.app.services.service:exampleService#SAMPLE_NUMBER_PROPERTY
	 * @propertyOf cmm.app.services.service:exampleService
	 * @type {number}
	 * @constant
	 *
	 * @description
	 * This is a property on a service which is exposed to the public.  In this case, it is behaving as a `constant` so
	 * it should be in CAPITAL_SNAKE_CASE
	 */
	this.SAMPLE_NUMBER_PROPERTY = 42;

	//******************** EXPOSED/PUBLIC METHODS ********************//
	this.doThing = doThing;
	this.getBindedValue = getBindedValue;
	this.getUnbindedValue = getUnbindedValue;
	this.handleMultiplePromises = handleMultiplePromises;

	//******************** FUNCTION DECLARATIONS ********************//
	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:exampleService#doAsyncThing1
	 * @methodOf cmm.app.services.service:exampleService
	 *
	 * @description
	 * This is an asynchronous method.  It does asynchronous things.
	 */
	function doAsyncThing1() {
		$log.debug('exampleService.doAsyncThing1 -- ENTER');

		//Get a new Deferred
		const deferred = $q.defer();

		//Resolve the Promise
		deferred.resolve('Promise is resolved!');

		$log.debug('exampleService.doAsyncThing1 -- EXIT');

		//Return the Promise
		return deferred.promise;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:exampleService#doAsyncThing2
	 * @methodOf cmm.app.services.service:exampleService
	 *
	 * @description
	 * This is an asynchronous method.  It does asynchronous things.
	 */
	function doAsyncThing2() {
		$log.debug('exampleService.doAsyncThing2 -- ENTER');

		//Get a new Deferred
		const deferred = $q.defer();

		//Resolve the Promise
		deferred.reject('Promise is rejected!');

		$log.debug('exampleService.doAsyncThing2 -- EXIT');

		//Return the Promise
		return deferred.promise;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:exampleService#doSneakyThing
	 * @methodOf cmm.app.services.service:exampleService
	 * @fires cmm.app.services.service:exampleService#exampleEvent
	 *
	 * @description
	 * This is a private method and is not exposed on the Host Object.  This method is hoisted and can be used anywhere
	 * in this Service.  All private methods should go in this section.
	 *
	 * NOTE: Note that nothing is being returned by this function, so it does not use a returns annotation.
	 */
	function doSneakyThing() {
		$log.debug('exampleService.doSneakyThing -- ENTER');

		//Do something private in here

		/**
		 * @ngdoc event
		 * @name cmm.app.services.service:exampleService#exampleEvent
		 * @eventOf cmm.app.services.service:exampleService
		 * @eventType broadcast on root scope
		 *
		 * @description
		 * This is a description about the event and what it is used for and why it is fired
		 */
		$rootScope.$broadcast('exampleEvent', 'Super Secret Payload');

		$log.debug('exampleService.doSneakyThing -- EXIT');
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:exampleService#doThing
	 * @methodOf cmm.app.services.service:exampleService
	 *
	 * @returns {string} Private String Property
	 *
	 * @description
	 * This function does a thing and this description explains exactly what it does.  It can also show an example of how to use it.
	 */
	function doThing() {
		$log.debug('exampleService.doThing -- ENTER');

		//Do the thing
		doSneakyThing();

		$log.info('The thing has been done. And here is a sample private property as a bonus! Sample private property value: ', sampleStringProperty);

		$log.debug('exampleService.doThing -- EXIT');

		//Return the private property value
		return sampleStringProperty;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:exampleService#getBindedValue
	 * @methodOf cmm.app.services.service:exampleService
	 *
	 * @param {boolean} inDataCondition - Arbitrary data condition to test branching with
	 * @returns {Promise} Future Object to be resolved or rejected
	 *
	 * @description
	 * Here is a description for the sample method on this Service Recipe.  It uses the `$http` Service to some arbitrary
	 * endpoint.  NOTE: For explicit clarity, only use the `.then()` callback method for "success" and only use the
	 * `.catch()` callback method for "failure/error".  This is more explicit than only using `.then(success, failure)`.
	 *
	 * NOTE: This method uses the `$q` service, so anything binded within the AngularJS digest loop will be updated when
	 * the value changes.  This style should be used when binding values to the View or within a `$watch` or
	 * `$watchCollection`
	 */
	function getBindedValue(inDataCondition) {
		$log.debug('exampleService.getBindedValue -- ENTER');

		//Get a new Deferred
		const deferred = $q.defer();

		//Simulate XHR call
		$timeout(() => {
			//Send an update notification
			deferred.notify('Checking arbitrary data condition to determine outcome of Promise');

			//Arbitrary data condition to determine whether to resolve or reject the Promise
			if (inDataCondition) {
				//Resolve the Promise
				deferred.resolve('Resolved Value');
			}
			else {
				//Reject the Promise
				deferred.reject('Rejection message/reason goes here');
			}
		}, 2000);

		$log.debug('exampleService.getBindedValue -- EXIT');

		//Return the Promise
		return deferred.promise;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:exampleService#getUnbindedValue
	 * @methodOf cmm.app.services.service:exampleService
	 *
	 * @param {object} inParam - My parameter object which contains my data
	 * @param {*} [inOptional] - An optional parameter for this method
	 * @returns {Promise} Future Object to be resolved or rejected
	 *
	 * @description
	 * Here is a description for the sample method on this Service Recipe.  It uses the `$http` Service to some arbitrary
	 * endpoint.
	 *
	 * NOTE: For explicit clarity, only use the `.then()` callback method for "success" and only use the
	 * `.catch()` callback method for "failure/error".  This is more explicit than only using `.then(success, failure)`.
	 *
	 * NOTE: This method returns a native ES6 Promise.  This does support asynchronous JavaScript, but beware!  When a
	 * native Promise is resolved or rejected, it is done so outside of the AngularJS digest loop!  If a View value is
	 * binded to the return value of a method that returns a native Promise, then you will need to manually call
	 * `$scope.apply()` to apply/bind the resolved value.  If the value is not binded to a View, and we are simply requiring
	 * asynchronous functionality, then native Promises work fine.  However, it *may* be confusing to some developers
	 * to see native Promises in some instances and the `$q` service being used in other instances.  It is up to the
	 * implementation team to decide on a pattern or best practices, but this method is here to document and show all
	 * possible examples.
	 */
	function getUnbindedValue(inParam, inOptional) {
		$log.debug('exampleService.getUnbindedValue -- ENTER');
		$log.debug('exampleService.getUnbindedValue -- Parameter: ', inParam);
		$log.debug('exampleService.getUnbindedValue -- Optional Parameter: ', inOptional);

		$log.debug('exampleService.getUnbindedValue -- EXIT');

		//Return native Promise
		return new Promise((resolve, reject) => {
			$http({
				'method': 'GET',
				'url': EnvironmentSettings.apiUrls.randomBaseUrl,
				'allowRetry': false,
				'maxRetries': 4
			}).then((data) => {
				//Resolve the Promise
				resolve(data);
			}).catch((err, status) => {
				//Reject the Promise
				reject(err, status);
			});
		});
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:exampleService#handleMultiplePromises
	 * @methodOf cmm.app.services.service:exampleService
	 *
	 * @returns {Promise} Future Object to be resolved or rejected
	 *
	 * @description
	 * Method that shows how multiple Promises can be handled at once so that only a single Promise is returned to consumer
	 */
	function handleMultiplePromises() {
		$log.debug('exampleService.handleMultiplePromises -- ENTER');

		//Get a new Deferred
		const deferred = $q.defer();

		//Array of Promises
		const promiseArray = [];

		//Push a resolved Promise to Array
		promiseArray.push(doAsyncThing1());

		//Push a rejected Promise to Array
		promiseArray.push(doAsyncThing2());

		//Wait until all Promises are settled (either resolved or rejected)
		$q.allSettled(promiseArray).then(() => {
			//Resolve the deferred Object
			deferred.resolve('Yay, multiple promises handled!');
		});

		$log.debug('exampleService.handleMultiplePromises -- EXIT');

		//Return the Promise
		return deferred.promise;
	}
}

export default {
	'name': 'exampleService',
	'fn': exampleService
};
