'use strict';

/**
 * @ngdoc directive
 * @name cmm.app.directives.directive:html
 *
 * @restrict 'E'
 * @element ANY
 *
 * @description
 * This directive removes the `no-js` CSS class from the root `<html>` Element so that you can tell if the Client has
 * JavaScript disabled
 */
function htmlDirective() {
	/**
	 * @ngdoc method
	 * @name cmm.app.directives.directive:ExampleDirective#link
	 * @methodOf cmm.app.directives.directive:ExampleDirective
	 *
	 * @param {service} scope - The Scope of the current DOM Element.  Depending on the DDO, could be shared or isolate
	 * @param {DOMElement} element - A jqLite wrapped instance of the current DOM Element
	 *
	 * @description
	 * This is the shorthand equivalent of the `$compile` Post-Link Function
	 */
	function link(scope, element) {
		element.removeClass('no-js');
	}

	return {
		'restrict': 'E',
		'link': link
	};
}

export default {
	'name': 'html',
	'fn': htmlDirective
};
