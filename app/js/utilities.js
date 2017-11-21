'use strict';

/**
 * @ngdoc function
 * @name Utilities
 *
 * @description
 * Class which provides any utility methods outside of the AngularJS application since it does
 * not have any AngularJS context
 */
function Utilities() {
	/**
	 * @name declare
	 * @param {object} map The object to iterate through
	 * @param {module} module The AngularJS module in which the declarations should occur
	 * @param {string} type The type of AngularJS Recipe which should be declared within the given module
	 * @description
	 * Iterates through a Map of exports and makes an AngularJS Recipe declaration inside of a given AngularJS module
	 */
	this.declare = (map, module, type) => {
		Object.keys(map).forEach((key) => {
			const item = map[key];

			if (!item) {
				return;
			}

			if (item.fn && typeof item.fn === 'function') {
				module[type](item.name, item.fn);
			}
			else {
				this.declare(item, module, type);
			}
		});
	};
}

export default Utilities;
