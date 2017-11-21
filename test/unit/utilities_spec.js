'use strict';

import Utilities from '../../app/js/utilities';

describe('Unit: Utilities', () => {
	//Variables
	const badService = {
		'default': undefined
	};
	const goodService = {
		'default': {
			'name': 'goodService',
			'fn': () => {
				const service = {};

				service.hello = () => {
					return 'I am goodService';
				};

				return service;
			}
		}
	};
	let module;
	let service;
	let utility;

	//Before each `it`
	beforeEach(() => {
		//Define a sample module
		module = angular.module('sampleModule', []);

		//Instantiate a new utility
		utility = new Utilities();
	});

	it('should exist', () => {
		expect(Utilities).toBeDefined();
	});

	it('should have `declare` method', () => {
		expect(utility.declare).toBeDefined();
	});

	it('should be able to declare AngularJS recipes properly', () => {
		//Declare the good recipe
		utility.declare(goodService, module, 'service');

		//Instantiate the sampleModule module
		angular.mock.module('sampleModule');

		//Inject services/constants
		angular.mock.inject((_goodService_) => {
			service = _goodService_;
		});

		//Expect the sample service to be defined
		expect(service).toBeDefined();
	});

	it('should be able to handle bad CommonJS exports', () => {
		//Declare the bad recipe
		utility.declare(badService, module, 'service');

		//Instantiate the sampleModule module
		angular.mock.module('sampleModule');

		//Expect the Invoke Queue to be empty
		expect(module._invokeQueue.length).toBe(0);
	});
});
