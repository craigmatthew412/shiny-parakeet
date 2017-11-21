'use strict';

describe('Unit: httpInterceptor', () => {
	//Injectables
	let $httpBackend;
	let $httpProvider;
	let $http;
	let AppSettings;
	let httpInterceptor;
	let EnvironmentSettings;

	//Before each `it`
	beforeEach(() => {
		//Instantiate the app module
		angular.mock.module('cmm.app', (_$httpProvider_) => {
			$httpProvider = _$httpProvider_;
		});

		//Inject services/constants
		angular.mock.inject((_$httpBackend_, _$http_, _AppSettings_, _EnvironmentSettings_, _httpInterceptor_) => {
			$httpBackend = _$httpBackend_;
			$http = _$http_;
			AppSettings = _AppSettings_;
			EnvironmentSettings = _EnvironmentSettings_;
			httpInterceptor = _httpInterceptor_;
		});
	});

	it('should exist', () => {
		expect(httpInterceptor).toBeDefined();
	});

	it('should be an Interceptor defined in $httpProvider', () => {
		//Expect the interceptor to be in the interceptors Array
		expect($httpProvider.interceptors).toContain('httpInterceptor');
	});

	it('should have a method handler for `request`', () => {
		//Expect a method
		expect(angular.isFunction(httpInterceptor.request)).toBe(true);
	});

	it('should have a method handler for `response`', () => {
		//Expect a method
		expect(angular.isFunction(httpInterceptor.response)).toBe(true);
	});

	it('should have a method handler for `responseError`', () => {
		//Expect a method
		expect(angular.isFunction(httpInterceptor.responseError)).toBe(true);
	});

	it('should be able to retry a bad Request and make a subsequent good Request', (done) => {
		//Spy on responseError method
		spyOn(httpInterceptor, 'response').and.callThrough();
		spyOn(httpInterceptor, 'responseError').and.callThrough();

		//Mock HTTP Request Counter
		let counter = 0;

		//Mock HTTP Response
		$httpBackend.when('GET', EnvironmentSettings.apiUrls.randomBaseUrl2).respond(() => {
			//Increment the counter
			counter += 1;

			//Set the Status code and message
			const status = counter > 2 ? 201 : 400;
			const message = counter > 2 ? 'I am an API success' : 'I am an API error';

			//Return response Array
			return [
				status,
				{
					'message': message
				}
			];
		});

		//Mock HTTP Request
		$http({
			'method': 'GET',
			'url': EnvironmentSettings.apiUrls.randomBaseUrl2,
			'allowRetry': true,
			'maxRetries': 4
		}).then((response) => {
			//Expect error status to match
			expect(response.status).toBe(201);

			//Expect error message to be defined
			expect(response.data.message).toBeDefined();

			//Expect error message to match
			expect(response.data.message).toBe('I am an API success');

			//Expect the responseError method to have been called
			expect(httpInterceptor.responseError).toHaveBeenCalled();

			//Expect the response method to have been called
			expect(httpInterceptor.response).toHaveBeenCalled();

			//Signal asynchronous operation complete
			done();
		});

		//Signal no more HTTP Requests
		$httpBackend.flush();
	});

	it('should be able to max out the number of retry Requests to prevent an infinite Request loop', (done) => {
		//Spy on responseError method
		spyOn(httpInterceptor, 'responseError').and.callThrough();

		//Mock HTTP Request Counter
		let counter = 0;

		//Number of retries
		const retries = 4;

		//Mock HTTP Response
		$httpBackend.when('GET', EnvironmentSettings.apiUrls.randomBaseUrl2).respond(() => {
			//Increment the counter
			counter += 1;

			//Return response Array
			return [
				400,
				{
					'message': 'I am an API error'
				}
			];
		});

		//Mock HTTP Request
		$http({
			'method': 'GET',
			'url': EnvironmentSettings.apiUrls.randomBaseUrl2,
			'allowRetry': true,
			'maxRetries': retries
		}).catch(() => {
			//Expect the max number of retries to to be consistent with what is defined in the config
			expect(counter).toBe(retries + 1);

			//Signal asynchronous operation complete
			done();
		});

		//Signal no more HTTP Requests
		$httpBackend.flush();
	});

	it('should be able to have the retry mechanism fallback the number of max retry attempts to the constant', (done) => {
		//Spy on responseError method
		spyOn(httpInterceptor, 'responseError').and.callThrough();

		//Mock HTTP Request Counter
		let counter = 0;

		//Mock HTTP Response
		$httpBackend.when('GET', EnvironmentSettings.apiUrls.randomBaseUrl2).respond(() => {
			//Increment the counter
			counter += 1;

			//Return response Array
			return [
				400,
				{
					'message': 'I am an API error'
				}
			];
		});

		//Mock HTTP Request
		$http({
			'method': 'GET',
			'url': EnvironmentSettings.apiUrls.randomBaseUrl2,
			'allowRetry': true,
			'maxRetries': undefined
		}).catch(() => {
			//Expect the max number of retries to to be consistent with the application constant
			expect(counter).toBe(AppSettings.maxApiRetries + 1);

			//Signal asynchronous operation complete
			done();
		});

		//Signal no more HTTP Requests
		$httpBackend.flush();
	});
});
