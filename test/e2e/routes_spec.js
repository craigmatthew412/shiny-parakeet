'use strict';

describe('E2E: Routes', () => {
	beforeEach(() => {
		browser.waitForAngular();
	});

	it('should have a working home route', () => {
		browser.get('/');

		expect(browser.getLocationAbsUrl()).toMatch('');

		expect(browser.getTitle()).toContain('Home');
	});

	it('should have a working 404 Page Not Found route', () => {
		browser.get('/nonexistent');

		expect(browser.getLocationAbsUrl()).toMatch('/404');

		expect(browser.getTitle()).toContain('404 Page Not Found');
	});
});
