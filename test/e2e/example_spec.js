'use strict';

describe('E2E: Example', () => {
	beforeEach(() => {
		browser.get('/');
		browser.waitForAngular();
	});

	it('should route correctly', () => {
		expect(browser.getLocationAbsUrl()).toMatch('/');
	});

	it('should show the number defined in the controller', () => {
		const element = browser.findElement(by.css('.number-example'));

		expect(element.getText()).toEqual('1234');
	});
});
