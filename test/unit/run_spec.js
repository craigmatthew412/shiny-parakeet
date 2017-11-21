'use strict';

describe('Unit: module.run()', () => {
	//Injectables
	let $rootScope;
	let runService;

	//Variables
	const sampleState = {
		'name': 'sample-state',
		'data': {
			'title': 'Some Other State',
			'description': 'This is a description for another valid State definition',
			'keywords': ['another', 'state definition']
		}
	};

	//Before each `it`
	beforeEach(() => {
		//Instantiate the app module
		angular.mock.module('cmm.app', (_$provide_) => {
			//Set up Spy
			_$provide_.value('runService', {
				'locationChangeStartCallback': jasmine.createSpy(),
				'stateChangeStartCallback': jasmine.createSpy(),
				'stateChangeErrorCallback': jasmine.createSpy(),
				'stateChangeSuccessCallback': jasmine.createSpy()
			});
		});

		//Inject services/constants
		angular.mock.inject((_$rootScope_, _runService_) => {
			$rootScope = _$rootScope_;
			runService = _runService_;
		});
	});

	it('should intercept URL location changes with the $locationChangeStart Event', () => {
		//Fire the Event
		$rootScope.$broadcast('$locationChangeStart');

		//Trigger a Digest Cycle
		$rootScope.$digest();

		//Expect the callback method to have been called
		expect(runService.locationChangeStartCallback).toHaveBeenCalled();
	});

	it('should intercept State changes with the $stateChangeStart Event', () => {
		//Fire the Event
		$rootScope.$broadcast('$stateChangeStart');

		//Trigger a Digest Cycle
		$rootScope.$digest();

		//Expect the callback method to have been called
		expect(runService.stateChangeStartCallback).toHaveBeenCalled();
	});

	it('should catch State change errors with the $stateChangeError Event', () => {
		//Fire the Event
		$rootScope.$broadcast('$stateChangeError');

		//Trigger a Digest Cycle
		$rootScope.$digest();

		//Expect the callback method to have been called
		expect(runService.stateChangeErrorCallback).toHaveBeenCalled();
	});

	it('should detect successful State changes with the $stateChangeSuccess Event', () => {
		//Fire the Event
		$rootScope.$broadcast('$stateChangeSuccess', sampleState, {}, {}, {});

		//Trigger a Digest Cycle
		$rootScope.$digest();

		//Expect the callback method to have been called
		expect(runService.stateChangeSuccessCallback).toHaveBeenCalled();
	});
});
