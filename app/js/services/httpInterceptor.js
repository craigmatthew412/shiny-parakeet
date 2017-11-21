'use strict';

/**
 * @ngdoc service
 * @name cmm.app.services.service:httpInterceptor
 *
 * @param {service} $injector - The AngularJS {@link $injector} Injector Service
 * @param {service} $log - The AngularJS {@link $log} Logging Service
 * @param {service} $q - The AngularJS {@link $q} Deferred/Promise Service
 * @param {object} AppSettings - The {@link cmm.app.object:AppSettings AppSettings} Application Settings Constant
 *
 * @description
 * AngularJS Service Recipe for intercepting all HTTP Requests and Responses.  It gives the capability to intercept
 * any incoming and outgoing HTTP Request and perform any modifications or operations as necessary.
 *
 * NOTE: There is a Response Error Retry mechanism built in.  The retry mechanism works by accepting 2 different
 * `$http` config properties: `allowRetry` and `maxRetries`.  The `allowRetry` property determines if the particular
 * HTTP Request is even allowed to attempt to retry.  The `maxRetries` property determines the maximum number of consecutive
 * retries allowed before quitting. Once the maximum number of consecutive retries has been reached, no further
 * automatic retries for that particular URL will be made until a successful HTTP Response is received, in which case
 * the retry counter is reset and the URL removed from the counter map.  If the `maxRetries` is not specified, the
 * Interceptor will fallback to a default value specified in the `AppSettings` Constant.
 */
function httpInterceptor($injector, $log, $q, AppSettings) {
	'ngInject';

	//******************** PRIVATE PROPERTIES ********************//
	/*
	 * The $http service needs to be manually injected if needed due to circular dependency issues at runtime.
	 */
	let $http;

	/**
	 * @ngdoc property
	 * @name cmm.app.services.service:httpInterceptor#urlRetryCounterMap
	 * @propertyOf cmm.app.services.service:httpInterceptor
	 * @type {object}
	 *
	 * @description
	 * Map which keeps track how many times a particular URL has been consecutively retried
	 */
	const urlRetryCounterMap = {};

	//******************** EXPOSED/PUBLIC METHODS ********************//
	this.request = request;
	/*
	 * Commented out for now, as there is only a single Interceptor defined.  If additional Interceptors get defined,
	 * then this should be uncommented as the Request could be rejected by another Interceptor.
	this.requestError = requestError;
	*/
	this.response = response;
	this.responseError = responseError;

	//******************** FUNCTION DECLARATIONS ********************//
	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:httpInterceptor#request
	 * @methodOf cmm.app.services.service:httpInterceptor
	 *
	 * @param {object} config - The $http configuration object
	 * @returns {object|Promise} The $http configuration object parameter or a promise containing the $http configuration object or a new $http configuration object
	 *
	 * @description
	 * Intercepts all HTTP Requests. Free to modify the config object or create a new one. The function needs to return
	 * the config object directly, or a promise containing the config or a new config object.
	 */
	function request(config) {
		//Get a new Deferred Object
		const deferred = $q.defer();

		//Check if cache is set to true
		if (!config.cache) {
			//Manually set cache to false to address AngularJS bug
			config.cache = false;
		}

		//Template request flag
		config.isTemplateRequest = config.url.indexOf('.html') > -1;

		//Resolve the HTTP config
		deferred.resolve(config);

		//Return Promise
		return deferred.promise;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:httpInterceptor#requestError
	 * @methodOf cmm.app.services.service:httpInterceptor
	 *
	 * @param {object} rejection - The rejection object; Contains the $http configuration object, status code, etc.
	 * @returns {object|Promise} The rejection object to be returned to the calling method
	 *
	 * @description
	 * Gets called when a previous interceptor threw an error or resolved with a rejection. Global HTTP Request error
	 * handling can be performed here.  NOTE: HTTP Request errors are far less typical than HTTP Response errors and
	 * are usually caught during development due to their nature. However, it might be good practice to implement some
	 * sort of fail safe or retry mechanism in the event of a failure.
	 */
	/*
	 * Commented out for now, as there is only a single Interceptor defined.  If additional Interceptors get defined,
	 * then this should be uncommented as the Request could be rejected by another Interceptor.
	function requestError(rejection) {
		$log.debug('httpInterceptor.requestError -- ENTER');
		$log.error('httpInterceptor.requestError -- HTTP Request rejection: ', rejection);
		$log.debug('httpInterceptor.requestError -- EXIT');

		//Return the rejection
		return $q.reject(rejection);
	}
	*/

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:httpInterceptor#response
	 * @methodOf cmm.app.services.service:httpInterceptor
	 *
	 * @param {object} inResponse - The HTTP Response object of an HTTP Request
	 * @returns {object|Promise} The HTTP Response object to be returned to the calling method
	 *
	 * @description
	 * Intercepts all HTTP Responses. Free to modify the response object or create a new one. The function needs to
	 * return the response object directly, or as a promise containing the response or a new response object. Global
	 * business validations or transformations can be performed here prior to handing the data over to the application
	 * code responsible for making the HTTP Request.
	 */
	function response(inResponse) {
		//Check to see if any previous failures for URL
		if (typeof urlRetryCounterMap[inResponse.config.url] !== 'undefined') {
			//URL has now returned successful, delete the key from the map so try mechanism is reset
			delete urlRetryCounterMap[inResponse.config.url];
		}

		//Return an HTTP Response Object
		return inResponse;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:httpInterceptor#responseError
	 * @methodOf cmm.app.services.service:httpInterceptor
	 *
	 * @param {object} rejection - The rejection object; Contains the $http configuration object, the server response, status code, etc.
	 * @returns {object|Promise} - The rejection object to be returned to the calling method
	 *
	 * @description
	 * Interceptor gets called when a previous interceptor threw an error or resolved with a rejection. Global
	 * HTTP Response error handling can be performed here.  It is also possible to retry the HTTP Request in the event
	 * of an HTTP Response error as a fail safe.
	 */
	function responseError(rejection) {
		$log.debug('httpInterceptor.responseError -- ENTER');

		//Check to ensure a config Object is available
		if (rejection.config) {
			$log.debug('httpInterceptor.responseError -- HTTP Error for URL: ', rejection.config.url);

			//Determine if we should attempt retry
			if (rejection.config.allowRetry) {
				$log.debug('httpInterceptor.responseError -- Retry enabled for URL: ', rejection.config.url);

				//Check to see if URL is in map
				if (typeof urlRetryCounterMap[rejection.config.url] === 'undefined') {
					//URL is not in the map, initialize it to 1
					urlRetryCounterMap[rejection.config.url] = 1;
				}
				else {
					//URL exists in the map, increment the counter
					urlRetryCounterMap[rejection.config.url] += 1;
				}

				//Check to see if the max try limit has been reached
				if (urlRetryCounterMap[rejection.config.url] > (rejection.config.maxRetries || AppSettings.maxApiRetries)) {
					//We have already made the max number of attempts, don't retry again
					$log.warn('httpInterceptor.responseError -- Max number of retry attempts for URL: ', rejection.config.url);
				}
				else {
					//Retry the Request, get the HTTP Service
					$http = $http || $injector.get('$http');

					$log.debug('httpInterceptor.responseError -- Retrying HTTP Request for URL: ', rejection.config.url);

					$log.debug('httpInterceptor.responseError -- EXIT');

					//Retry Request by returning the $http Promise
					return $http(rejection.config);
				}
			}
		}
		else {
			$log.debug('httpInterceptor.responseError -- HTTP Error but there is not an HTTP config present');
		}

		$log.debug('httpInterceptor.responseError -- EXIT');

		//Return the rejection
		return $q.reject(rejection);
	}
}

export default {
	'name': 'httpInterceptor',
	'fn': httpInterceptor
};
