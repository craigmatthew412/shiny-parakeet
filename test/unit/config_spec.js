'use strict';

describe('Unit: module.config()', () => {
	//Injectables
	let $compileProvider;
	let $locationProvider;
	let $http;
	let $logProvider;
	let $stateProvider;
	let $uiViewScrollProvider;
	let $urlMatcherFactoryProvider;
	let $urlRouterProvider;
	let EnvironmentSettings;
	let nodeApi;

	//Variables
	const fallbackState = '/404';
	const html5Mode = {
		'enabled': true,
		'requireBase': false
	};

	//Before each `it`
	beforeEach(() => {
		//Set up Spy on UI-Router providers before instantiating our app module
		angular.mock.module('ui.router', (_$stateProvider_, _$uiViewScrollProvider_, _$urlMatcherFactoryProvider_, _$urlRouterProvider_) => {
			$stateProvider = _$stateProvider_;
			$uiViewScrollProvider = _$uiViewScrollProvider_;
			$urlMatcherFactoryProvider = _$urlMatcherFactoryProvider_;
			$urlRouterProvider = _$urlRouterProvider_;

			spyOn($stateProvider, 'state').and.callThrough();
			spyOn($uiViewScrollProvider, 'useAnchorScroll').and.callThrough();
			spyOn($urlMatcherFactoryProvider, 'caseInsensitive').and.callThrough();
			spyOn($urlRouterProvider, 'otherwise').and.callThrough();
		});

		//Set up Spy on Angular providers before instantiating our app module
		angular.mock.module((_$compileProvider_, _$locationProvider_, _$logProvider_) => {
			$locationProvider = _$locationProvider_;
			$logProvider = _$logProvider_;
			$compileProvider = _$compileProvider_;

			spyOn($compileProvider, 'debugInfoEnabled').and.callThrough();
			spyOn($locationProvider, 'html5Mode').and.callThrough();
			spyOn($logProvider, 'debugEnabled').and.callThrough();
		});

		//Instantiate the app module
		angular.mock.module('cmm.app');

		//Inject services/constants
		angular.mock.inject((_$http_, _EnvironmentSettings_, _nodeApi_) => {
			$http = _$http_;
			EnvironmentSettings = _EnvironmentSettings_;
			nodeApi = _nodeApi_;
		});
	});

	it('should set the logging service debug mode during configuration', () => {
		//Expect the method to have been called
		expect($logProvider.debugEnabled).toHaveBeenCalledWith(EnvironmentSettings.debugMode);
	});

	it('should set the html5 mode during configuration', () => {
		//Expect the method to have been called
		expect($locationProvider.html5Mode).toHaveBeenCalledWith(html5Mode);
	});

	it('should set the compile service debug mode during configuration', () => {
		//Expect the method to have been called
		expect($compileProvider.debugInfoEnabled).toHaveBeenCalledWith(EnvironmentSettings.debugMode);
	});

	it('should set the UI View Scroll during configuration', () => {
		//Expect the method to have been called
		expect($uiViewScrollProvider.useAnchorScroll).toHaveBeenCalled();
	});

	it('should set the URL matcher case sensitivity to true during configuration', () => {
		//Expect the method to have been called
		expect($urlMatcherFactoryProvider.caseInsensitive).toHaveBeenCalledWith(true);
	});

	it('should set a fallback (otherwise) State during configuration', () => {
		//Expect the method to have been called
		expect($urlRouterProvider.otherwise).toHaveBeenCalledWith(fallbackState);
	});

	it('should set HTTP default headers correctly during configuration', () => {
		//Expect the default Accept header to be application/json
		expect($http.defaults.headers.common.Accept).toBe('application/json');

		//Expect the X-Requested-With to be deleted
		expect($http.defaults.headers.common['X-Requested-With']).not.toBeDefined();
	});

	it('should set at least a single State during configuration', () => {
		//Expect the method to have been called
		expect($stateProvider.state).toHaveBeenCalled();
	});

	it('should set the Node.js Base API URL from the EnvironmentSettings constant during configuration', () => {
		//Expect the Base API URL to be the same as the EnvironmentSettings constant
		expect(nodeApi.getBaseApiUrl()).toBe(EnvironmentSettings.apiUrls.nodeBaseUrl);
	});
});
