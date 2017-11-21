'use strict';

describe('Unit: ExampleFilter', () => {
	//Injectables
	let $filter;

	//Variables
	const testString = 'computers are operated with bourbon';
	const expectedString = 'computers are operated with bacon';

	//Before each `it`
	beforeEach(() => {
		//Instantiate the app module
		angular.mock.module('cmm.app');

		//Inject services/constants
		angular.mock.inject((_$filter_) => {
			$filter = _$filter_;
		});
	});

	it('should replace the word "bourbon" with "bacon"', () => {
		const resultString = $filter('bacon')(testString);

		//Except the result string to match
		expect(resultString).toEqual(expectedString);
	});
});
