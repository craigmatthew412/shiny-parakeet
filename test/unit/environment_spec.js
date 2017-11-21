'use strict';

describe('Unit: EnvironmentSettings', () => {
	//Injectables
	let EnvironmentSettings;

	//Before each `it`
	beforeEach(() => {
		//Instantiate the app module
		angular.mock.module('cmm.app');

		//Inject services/constants
		angular.mock.inject((_EnvironmentSettings_) => {
			EnvironmentSettings = _EnvironmentSettings_;
		});
	});

	it('should exist', () => {
		expect(EnvironmentSettings).toBeDefined();
	});

	it('should have a debug mode', () => {
		expect(EnvironmentSettings.debugMode).toBeDefined();
	});
});
