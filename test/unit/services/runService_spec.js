'use strict';

describe('Unit: runService', () => {
	//Injectables
	let $log;
	let $rootScope;
	let runService;

	//Variables
	const stateChangeErrorMessage = 'Sample error message';

	//Before each `it`
	beforeEach(() => {
		//instantiate the app module
		angular.mock.module('cmm.app');

		//Inject services/constants
		angular.mock.inject((_$log_, _$rootScope_, _runService_) => {
			$log = _$log_;
			$rootScope = _$rootScope_;
			runService = _runService_;
		});

		//Set up Spy
		spyOn($log, 'error').and.callThrough();
	});

	it('should exist', () => {
		expect(runService).toBeDefined();
	});

	it('should expose a callback for the $locationChangeStart Event', () => {
		expect(runService.locationChangeStartCallback).toBeDefined();
	});

	it('should expose a callback for the $stateChangeStart Event', () => {
		expect(runService.stateChangeStartCallback).toBeDefined();
	});

	it('should expose a callback for the $stateChangeError Event', () => {
		expect(runService.stateChangeErrorCallback).toBeDefined();
	});

	it('should expose a callback for the $stateChangeSuccess Event', () => {
		expect(runService.stateChangeSuccessCallback).toBeDefined();
	});

	it('should log State change errors', () => {
		//Fire the Event
		$rootScope.$broadcast('$stateChangeError', {}, {}, {}, {}, stateChangeErrorMessage);

		//Trigger a Digest Cycle
		$rootScope.$digest();

		//Except the error to be logged
		expect($log.error).toHaveBeenCalledWith('$stateChangeError: ', stateChangeErrorMessage);

		/*
		$rootScope.$apply(() => {
			$state.go("splash");
		});
		*/
	});
});
