'use strict';

describe('Unit: metaInformationService ', () => {
	//Injectables
	let metaInformationService;

	//Variables
	const sampleTagValue = 'SampleTagValue';
	const keywords = ['One', 'Two', 'Three'];
	const notAnArray = 'Not an Array';
	const emptyString = '';

	//Before each `it`
	beforeEach(() => {
		//Instantiate the app module
		angular.mock.module('cmm.app');

		//Inject services/constants
		angular.mock.inject((_metaInformationService_) => {
			metaInformationService = _metaInformationService_;
		});
	});

	it('should exist', () => {
		expect(metaInformationService).toBeDefined();
	});

	it('should set and get Canonical Meta Tag', () => {
		//Set the meta tag
		metaInformationService.setCanonical(sampleTagValue);

		//Getter should return the same value passed to the Setter
		expect(metaInformationService.getCanonical()).toBe(sampleTagValue);
	});

	it('should set and get Google Site Verification Meta Tag', () => {
		//Set the meta tag
		metaInformationService.setGoogleSiteVerification(sampleTagValue);

		//Getter should return the same value passed to the Setter
		expect(metaInformationService.getGoogleSiteVerification()).toBe(sampleTagValue);
	});

	it('should set and get Location Meta Tag', () => {
		//Set the meta tag
		metaInformationService.setLocation(sampleTagValue);

		//Getter should return the same value passed to the Setter
		expect(metaInformationService.getLocation()).toBe(sampleTagValue);
	});

	it('should set and get Description Meta Tag', () => {
		//Set the meta tag
		metaInformationService.setMetaDescription(sampleTagValue);

		//Getter should return the same value passed to the Setter
		expect(metaInformationService.getMetaDescription()).toBe(sampleTagValue);
	});

	it('should set and get Keywords Meta Tag', () => {
		//Set the meta tag
		metaInformationService.setMetaKeywords(keywords);

		//Getter should return the same value passed to the Setter
		expect(metaInformationService.getMetaKeywords()).toBe(keywords.join());
	});

	it('should handle bad Keywords Meta Tag input', () => {
		//Set the meta tag
		metaInformationService.setMetaKeywords(notAnArray);

		//Getter should return an empty String
		expect(metaInformationService.getMetaKeywords()).toBe(emptyString);
	});

	it('should set and get Product Image URL Meta Tag', () => {
		//Set the meta tag
		metaInformationService.setProductImageUrl(sampleTagValue);

		//Getter should return the same value passed to the Setter
		expect(metaInformationService.getProductImageUrl()).toBe(sampleTagValue);
	});

	it('should set and get Robots Meta Tag', () => {
		//Set the meta tag
		metaInformationService.setRobots(sampleTagValue);

		//Getter should return the same value passed to the Setter
		expect(metaInformationService.getRobots()).toBe(sampleTagValue);
	});

	it('should set and get Title Meta Tag', () => {
		//Set the meta tag
		metaInformationService.setTitle(sampleTagValue);

		//Getter should return the same value passed to the Setter
		expect(metaInformationService.getTitle()).toBe(sampleTagValue);
	});

	it('should reset all of the Meta Tags', () => {
		//Reset the Meta Tags
		metaInformationService.resetMetaTags();

		//Getters should all return empty Strings
		expect(metaInformationService.getCanonical()).toBe(emptyString);
		expect(metaInformationService.getGoogleSiteVerification()).toBe(emptyString);
		expect(metaInformationService.getLocation()).toBe(emptyString);
		expect(metaInformationService.getMetaDescription()).toBe(emptyString);
		expect(metaInformationService.getMetaKeywords()).toBe(emptyString);
		expect(metaInformationService.getProductImageUrl()).toBe(emptyString);
		expect(metaInformationService.getRobots()).toBe(emptyString);
		expect(metaInformationService.getTitle()).toBe(emptyString);
	});
});
