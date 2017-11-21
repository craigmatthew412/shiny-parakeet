'use strict';

/**
 * @ngdoc service
 * @name cmm.app.providers.service:nodeApi
 *
 * @description
 * AngularJS Provider Recipe Class for managing Node.js APIs
 */

/**
 * @ngdoc service
 * @name cmm.app.providers.service:nodeApiProvider
 *
 * @description
 * AngularJS Provider Recipe Class for managing Node.js APIs
 */
function nodeApiProvider() {
	/**
	 * @ngdoc property
	 * @name cmm.app.providers.service:nodeApiProvider#baseApiUrl
	 * @propertyOf cmm.app.providers.service:nodeApiProvider
	 * @type {string}
	 *
	 * @description
	 * Base API URL
	 */
	let baseApiUrl = '';

	/**
	 * @ngdoc method
	 * @name cmm.app.providers.service:nodeApiProvider#setBaseApiUrl
	 * @methodOf cmm.app.providers.service:nodeApiProvider
	 *
	 * @param {string} inBaseApiUrl - The Base API URL to set
	 *
	 * @description
	 * Setter method for the Base API URL.  This public method is only available during the module.config() phase of the application lifecycle.
	 */
	this.setBaseApiUrl = (inBaseApiUrl) => {
		//Set the URL
		baseApiUrl = inBaseApiUrl;
	};

	/**
	 * @ngdoc method
	 * @name cmm.app.providers.service:nodeApiProvider#$get
	 * @methodOf cmm.app.providers.service:nodeApiProvider
	 *
	 * @returns {object} Public method(s) which is/are only available after the module.config() phase of the application lifecycle.
	 *
	 * @description
	 * Mandatory Provider Recipe $get method. This gets called automatically after configuration.
	 */
	this.$get = () => {
		/*
		 * Host Object to be returned.  It exposes public methods and properties.
		 */
		const provider = {};

		/**
		 * @ngdoc method
		 * @name cmm.app.providers.service:nodeApi#getBaseApiUrl
		 * @methodOf cmm.app.providers.service:nodeApi
		 *
		 * @returns {string} the Base API URL
		 *
		 * @description
		 * Getter method for the Base API URL
		 */
		provider.getBaseApiUrl = () => {
			return baseApiUrl;
		};

		//Return the Host Object
		return provider;
	};
}

export default {
	'name': 'nodeApi',
	'fn': nodeApiProvider
};
