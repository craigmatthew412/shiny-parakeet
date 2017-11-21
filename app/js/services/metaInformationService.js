'use strict';

/**
 * @ngdoc service
 * @name cmm.app.services.service:metaInformationService
 *
 * @description
 * This is a utility service for meta information. It handles any dynamic meta tags for the application.
 */
function metaInformationService() {
	'ngInject';

	//******************** PRIVATE PROPERTIES ********************//
	/**
	 * @ngdoc property
	 * @name cmm.app.services.service:metaInformationService#canonical
	 * @propertyOf cmm.app.services.service:metaInformationService
	 * @type {string}
	 *
	 * @description
	 * Canonical Meta Tag
	 */
	let canonical = '';

	/**
	 * @ngdoc property
	 * @name cmm.app.services.service:metaInformationService#googleSiteVerification
	 * @propertyOf cmm.app.services.service:metaInformationService
	 * @type {string}
	 *
	 * @description
	 * Google Site Verification Meta Tag
	 */
	let googleSiteVerification = '';

	/**
	 * @ngdoc property
	 * @name cmm.app.services.service:metaInformationService#location
	 * @propertyOf cmm.app.services.service:metaInformationService
	 * @type {string}
	 *
	 * @description
	 * URL Meta Tag
	 */
	let location = '';

	/**
	 * @ngdoc property
	 * @name cmm.app.services.service:metaInformationService#metaDescription
	 * @propertyOf cmm.app.services.service:metaInformationService
	 * @type {string}
	 *
	 * @description
	 * Description Meta Tag
	 */
	let metaDescription = '';

	/**
	 * @ngdoc property
	 * @name cmm.app.services.service:metaInformationService#metaKeywords
	 * @propertyOf cmm.app.services.service:metaInformationService
	 * @type {string}
	 *
	 * @description
	 * Keywords Meta Tag
	 */
	let metaKeywords = '';

	/**
	 * @ngdoc property
	 * @name cmm.app.services.service:metaInformationService#productImageUrl
	 * @propertyOf cmm.app.services.service:metaInformationService
	 * @type {string}
	 *
	 * @description
	 * Product Image URL Meta Tag
	 */
	let productImageUrl = '';

	/**
	 * @ngdoc property
	 * @name cmm.app.services.service:metaInformationService#robots
	 * @propertyOf cmm.app.services.service:metaInformationService
	 * @type {string}
	 *
	 * @description
	 * Robots Meta Tag
	 */
	let robots = '';

	/**
	 * @ngdoc property
	 * @name cmm.app.services.service:metaInformationService#title
	 * @propertyOf cmm.app.services.service:metaInformationService
	 * @type {string}
	 *
	 * @description
	 * Title Meta Tag
	 */
	let title = '';

	//******************** EXPOSED/PUBLIC METHODS ********************//
	this.resetMetaTags = resetMetaTags;

	//Getters
	this.getCanonical = getCanonical;
	this.getGoogleSiteVerification = getGoogleSiteVerification;
	this.getLocation = getLocation;
	this.getMetaDescription = getMetaDescription;
	this.getMetaKeywords = getMetaKeywords;
	this.getProductImageUrl = getProductImageUrl;
	this.getRobots = getRobots;
	this.getTitle = getTitle;

	//Setters
	this.setCanonical = setCanonical;
	this.setGoogleSiteVerification = setGoogleSiteVerification;
	this.setLocation = setLocation;
	this.setMetaDescription = setMetaDescription;
	this.setMetaKeywords = setMetaKeywords;
	this.setProductImageUrl = setProductImageUrl;
	this.setRobots = setRobots;
	this.setTitle = setTitle;

	//******************** FUNCTION DECLARATIONS ********************//
	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#resetMetaTags
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @description
	 * Resets all of the fields
	 */
	function resetMetaTags() {
		googleSiteVerification = '';
		location = '';
		metaDescription = '';
		metaKeywords = '';
		productImageUrl = '';
		robots = '';
		title = '';
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#getCanonical
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @returns {string} Canonical Meta Tag
	 *
	 * @description
	 * Getter method for Canonical Meta Tag
	 */
	function getCanonical() {
		return canonical;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#getGoogleSiteVerification
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @returns {string} Google Site Verification Meta Tag
	 *
	 * @description
	 * Getter method for Google Site Verification Meta Tag
	 */
	function getGoogleSiteVerification() {
		return googleSiteVerification;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#getLocation
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @returns {string} Location Meta Tag
	 *
	 * @description
	 * Getter method for Location Meta Tag
	 */
	function getLocation() {
		return location;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#getMetaDescription
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @returns {string} Description Meta Tag
	 *
	 * @description
	 * Getter method for Description Meta Tag
	 */
	function getMetaDescription() {
		return metaDescription;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#getMetaKeywords
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @returns {string} Keywords Meta Tag
	 *
	 * @description
	 * Getter method for Keywords Meta Tag
	 */
	function getMetaKeywords() {
		return metaKeywords;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#getProductImageUrl
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @returns {string} Product Image URL Meta Tag
	 *
	 * @description
	 * Getter method for Product Image URL Meta Tag
	 */
	function getProductImageUrl() {
		return productImageUrl;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#getRobots
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @returns {string} Robots Meta Tag
	 *
	 * @description
	 * Getter method for Robots Meta Tag
	 */
	function getRobots() {
		return robots;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#getTitle
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @returns {string} Title Meta Tag
	 *
	 * @description
	 * Getter method for Title Meta Tag
	 */
	function getTitle() {
		return title;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#setCanonical
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @param {string} inCanonical - The Canonical Meta Tag to set
	 *
	 * @description
	 * Setter method for Canonical Meta Tag
	 */
	function setCanonical(inCanonical) {
		canonical = inCanonical;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#setGoogleSiteVerification
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @param {string} inGoogleSiteVerification - The Google Site Verification Meta Tag to set
	 *
	 * @description
	 * Setter method for Google Site Verification Meta Tag
	 */
	function setGoogleSiteVerification(inGoogleSiteVerification) {
		googleSiteVerification = inGoogleSiteVerification;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#setLocation
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @param {string} inLocation - The Location Meta Tag to set
	 *
	 * @description
	 * Setter method for Location Meta Tag
	 */
	function setLocation(inLocation) {
		location = inLocation;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#setMetaDescription
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @param {string} inMetaDescription - The Description Meta Tag to set
	 *
	 * @description
	 * Setter method for Description Meta Tag
	 */
	function setMetaDescription(inMetaDescription) {
		metaDescription = inMetaDescription;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#setMetaKeywords
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @param {array} inKeywords - The Keywords Meta Tag to set
	 *
	 * @description
	 * Setter method for Keywords Meta Tag
	 */
	function setMetaKeywords(inKeywords) {
		if (inKeywords && Array.isArray(inKeywords)) {
			metaKeywords = inKeywords.join();
		}
		else {
			metaKeywords = '';
		}
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#setProductImageUrl
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @param {string} inProductImageUrl - The Product Image URL Meta Tag to set
	 *
	 * @description
	 * Setter method for Product Image URL Meta Tag
	 */
	function setProductImageUrl(inProductImageUrl) {
		productImageUrl = inProductImageUrl;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#setRobots
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @param {string} inRobots - The Robots Meta Tag to set
	 *
	 * @description
	 * Setter method for Robots Meta Tag
	 */
	function setRobots(inRobots) {
		robots = inRobots;
	}

	/**
	 * @ngdoc method
	 * @name cmm.app.services.service:metaInformationService#setTitle
	 * @methodOf cmm.app.services.service:metaInformationService
	 *
	 * @param {string} inTitle - The Title Meta Tag to set
	 *
	 * @description
	 * Setter method for Title Meta Tag
	 */
	function setTitle(inTitle) {
		title = inTitle;
	}
}

export default {
	'name': 'metaInformationService',
	'fn': metaInformationService
};
