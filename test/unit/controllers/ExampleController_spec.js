'use strict';

describe('Unit: ExampleController', () => {
	//Injectables
	let ExampleController;
	let exampleService;

	//Variables
	const resolvedData = 'I am resolved data';

	//Before each `it`
	beforeEach(() => {
		//Instantiate the app module
		angular.mock.module('cmm.app');

		//Inject services/constants
		angular.mock.inject((_$controller_, _exampleService_) => {
			ExampleController = _$controller_('ExampleController', {
				'_myResolvedData': resolvedData,
				'exampleService': exampleService
			});
			exampleService = _exampleService_;
		});
	});

	it('should exist', () => {
		expect(ExampleController).toBeDefined();
	});

	it('should have a number variable equal to 1234', () => {
		expect(ExampleController.number).toBe(1234);
	});

	it('should have a title variable equal to \'Written with keyboards and bourbon! And more bourbon!\'', () => {
		expect(ExampleController.title).toBe('Written with keyboards and bourbon! And more bourbon!');
	});

	it('should be able to access resolved State data', () => {
		expect(ExampleController.myResolvedData).toEqual(resolvedData);
	});

	it('should be able to execution functions', () => {
		ExampleController.myViewFunction();

		expect(ExampleController.privateProperty).toBe('I am a sample private Property!');
	});
});
