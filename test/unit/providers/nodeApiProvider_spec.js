'use strict';

describe('Unit: nodeApiProvider', () => {
	//Injectables
	let nodeApi;
	let nodeApiProvider;

	//Variables
	const sampleUrl = '/my/sample/url';

	//Before each `it`
	beforeEach(() => {
		//Instantiate the app module
		angular.mock.module('cmm.app', (_nodeApiProvider_) => {
			nodeApiProvider = _nodeApiProvider_;
		});

		//Inject services/constants
		angular.mock.inject((_nodeApi_) => {
			nodeApi = _nodeApi_;
		});
	});

	it('should exist', () => {
		expect(nodeApi).toBeDefined();
	});

	it('should set and get Node.js Base API URL', () => {
		//Set the meta tag
		nodeApiProvider.setBaseApiUrl(sampleUrl);

		//Getter should return the same value passed to the Setter
		expect(nodeApi.getBaseApiUrl()).toBe(sampleUrl);
	});
});
