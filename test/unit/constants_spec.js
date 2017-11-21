'use strict';

describe('Unit: AppSettings', () => {
	//Injectables
	let AppSettings;

	//Before each `it`
	beforeEach(() => {
		//Instantiate the app module
		angular.mock.module('cmm.app');

		//Inject services/constants
		angular.mock.inject((_AppSettings_) => {
			AppSettings = _AppSettings_;
		});
	});

	it('should exist', () => {
		expect(AppSettings).toBeDefined();
	});

	it('should have an application title', () => {
		expect(AppSettings.appTitle).toBeDefined();
	});
});
