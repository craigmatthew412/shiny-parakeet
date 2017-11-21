'use strict';

describe('Unit: exampleService', () => {
	let httpBackend;
	let service;
	let timeout;
	let environment;
	let rootScope;

	beforeEach(() => {
		//instantiate the app module
		angular.mock.module('cmm.app');

		//mock the service
		angular.mock.inject((_$httpBackend_, _$rootScope_, _$timeout_, exampleService, EnvironmentSettings) => {
			httpBackend = _$httpBackend_;
			rootScope = _$rootScope_;
			timeout = _$timeout_;
			service = exampleService;
			environment = EnvironmentSettings;
		});
	});

	it('should exist', () => {
		expect(service).toBeDefined();
	});

	it('should retrieve data', (done) => {
		httpBackend.expect('GET', environment.apiUrls.randomBaseUrl).respond(201, {
			'data': 1234
		});

		service.getUnbindedValue().then((result) => {
			expect(result.data).toEqual({
				'data': 1234
			});

			//Signal asynchronous operation complete
			done();
		});

		httpBackend.flush();
	});

	it('should handle API errors', (done) => {
		httpBackend.expect('GET', environment.apiUrls.randomBaseUrl).respond(400, {
			'message': 'I am an API error'
		});

		service.getUnbindedValue().catch((error) => {
			//Expect error status to match
			expect(error.status).toBe(400);

			//Expect error message to be defined
			expect(error.data.message).toBeDefined();

			//Expect error message to match
			expect(error.data.message).toBe('I am an API error');

			//Signal asynchronous operation complete
			done();
		});

		httpBackend.flush();
	});

	it('should support resolving asynchronous promises', (done) => {
		//Test resolve branch
		service.getBindedValue(true).then((response) => {
			//Expect resolved value
			expect(response).toBe('Resolved Value');

			//Signal asynchronous operation complete
			done();
		});

		//Flush the $timeout
		timeout.flush();
	});

	it('should support rejecting asynchronous promises', (done) => {
		//Test rejection branch
		service.getBindedValue(false).catch((error) => {
			//Expect rejected value
			expect(error).toBe('Rejection message/reason goes here');

			//Signal asynchronous operation complete
			done();
		});

		//Flush the $timeout
		timeout.flush();
	});

	it('should support handling multiple promises at once', (done) => {
		service.handleMultiplePromises().then((response) => {
			//Expect resolved value
			expect(response).toBe('Yay, multiple promises handled!');

			//Signal asynchronous operation complete
			done();
		});

		rootScope.$digest();
	});

	it('should be able to access private properties through getters', () => {
		//Except return value of private property to match
		expect(service.doThing()).toBe('I am a sample private Property!');
	});
});
