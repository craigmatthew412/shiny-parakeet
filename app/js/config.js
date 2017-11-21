'use strict';

/**
 * @ngdoc function
 * @name cmm.app.function:config
 *
 * @param {provider} $compileProvider - The AngularJS {@link $compileProvider} Compile Provider which is used to configure the $compile {@link $compile} Compile Service
 * @param {provider} $httpProvider - The AngularJS {@link $httpProvider} HTTP Provider which is used to configure the $httpProvider {@link $http} HTTP Service
 * @param {provider} $locationProvider - The AngularJS {@link $locationProvider} Location Provider which is used to configure the {@link $location} Location Service
 * @param {provider} $logProvider - The AngularJS {@link $logProvider} Log Provider which is used to configure the {@link $log} Log Service
 * @param {provider} $provide - The AngularJS {@link $provide} Provide Service
 * @param {provider} $stateProvider - The UI-Router {@link $stateProvider} State Provider which is used to configure the {@link $state} State Service
 * @param {provider} $uiViewScrollProvider - The UI-Router {@link $uiViewScrollProvider} View Scroll Provider which is used to configure anchor scrolling
 * @param {provider} $urlMatcherFactoryProvider - The UI-Router {@link $urlMatcherFactoryProvider} URL Matcher Factory Provider which is used to configure State Routing
 * @param {provider} $urlRouterProvider - The UI-Router {@link $urlRouterProvider} URL Router Provider which is used to configure State Routing
 * @param {object} EnvironmentSettings - The {@link EnvironmentSettings} Environment Settings Constant
 * @param {provider} nodeApiProvider - The {@link cmm.app.providers.service:nodeApiProvider nodeApiProvider} Node.js API Provider which is used to configure Node.js API related properties such as Base API URL
 *
 * @description
 * Configuration Block which behaves as a provider-injector and gets executed during the Provider registrations and configuration phase.
 * Only Providers and Constants may be injected into this method.  It is meant to be used for configuration of our application before the runtime phase.
 */
function config($compileProvider, $httpProvider, $locationProvider, $logProvider, $provide, $stateProvider, $uiViewScrollProvider, $urlMatcherFactoryProvider, $urlRouterProvider, EnvironmentSettings, nodeApiProvider) {
	'ngInject';

	//Set Debugging
	$compileProvider.debugInfoEnabled(EnvironmentSettings.debugMode);
	$logProvider.debugEnabled(EnvironmentSettings.debugMode);

	//Set the Node.js Base API URL
	nodeApiProvider.setBaseApiUrl(EnvironmentSettings.apiUrls.nodeBaseUrl);

	//Inject the HTTP Interceptor
	$httpProvider.interceptors.push('httpInterceptor');

	//HTTP Default Header(s)
	$httpProvider.defaults.headers.common.Accept = 'application/json';

	//Delete the X-Requested-With Header
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	//Set HTML5 Mode for Browser History and clean URLs without the Hashbang (#).  NOTE:  requireBase = false causes IE9 compatibility issues.
	$locationProvider.html5Mode({
		'enabled': true,
		'requireBase': false
	});

	//Set the UI-View Scroll Provider to use Anchor Scroll (scroll anchor into view)
	$uiViewScrollProvider.useAnchorScroll();

	//Rule for allowing Case Insensitive URLs
	$urlMatcherFactoryProvider.caseInsensitive(true);

	//Otherwise go to 404 when a matching State isn't found
	$urlRouterProvider.otherwise('/404');

	//Configure known States
	$stateProvider
		.state('home', {
			'url': '/',
			'controller': 'ExampleController as home',
			'templateUrl': 'home.html',
			'data': {
				'title': 'Home',
				'description': 'This is a description for the Home page',
				'keywords': ['Homepage', 'Keywords']
			},
			'resolve': {
				'_myResolvedData': () => {
					return 'Must contain bacon!';
				}
			}
		})
		.state('other-state', {
			'url': '/other-state',
			'templateUrl': 'other.html',
			'data': {
				'title': 'Some Other State',
				'description': 'This is a description for another valid State definition',
				'keywords': ['another', 'state definition']
			}
		})
		.state('empty-data', {
			'url': '/empty-data',
			'templateUrl': 'other.html',
			'data': {}
		})
		.state('404', {
			'url': '/404',
			'templateUrl': '404.html',
			'data': {
				'title': '404 Page Not Found',
				'description': 'This is a description for the 404 page',
				'keywords': []
			}
		});

	//Decorate the $q Service
	$provide.decorator('$q', ['$delegate', ($delegate) => {
		//Get the $q Service
		const $q = $delegate;

		//Add the new function to $q
		$q.allSettled = $q.allSettled || allSettled;

		//Return the decorated $q
		return $q;

		/**
		 * @param {object} promises - The Promises to wrap
		 * @returns {Promise}
		 *
		 * @description
		 * Implementation of allSettled function from Kris Kowal's Q:
		 * https://github.com/kriskowal/q/wiki/API-Reference#promiseallsettled
		 */
		function allSettled(promises) {
			const wrapped = angular.isArray(promises) ? [] : {};

			//Iterate though the Promises
			angular.forEach(promises, (promise, key) => {
				//Check to see if wrapped key exists or not
				if (!lodash.has(wrapped, key)) {
					//Wrapped key does not exist, wrap Promise and add the key
					wrapped[key] = wrap(promise);
				}
			});

			return $q.all(wrapped);

			function wrap(promise) {
				return $q.when(promise).then((value) => {
					return {
						'state': 'fulfilled',
						'value': value
					};
				}, (reason) => {
					return {
						'state': 'rejected',
						'reason': reason
					};
				});
			}
		}
	}]);
}

export default config;
