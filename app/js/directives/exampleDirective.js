'use strict';

/**
 * @ngdoc directive
 * @name cmm.app.directives.directive:ExampleDirective
 *
 * @scope
 * @param {string} title - The title to be displayed in the component
 * @param {string=} message - The message to be displayed in the alert window.  NOTE: The equals sign in the type signals this parameter is optional.
 *
 * @requires utilityService
 *
 * @restrict 'EA'
 * @element ANY
 *
 * @description
 * This directive displays a title and attaches a `click` Event listener to the element to display an optional message if
 * supplied.  It also listens for the `$destroy` Event on the scope and cleans up after itself my detaching the listener.
 * NOTE: Using back ticks will format the text in code format.
 */
function ExampleDirective(utilityService) {
	'ngInject';

	/**
	 * @ngdoc method
	 * @name cmm.app.directives.directive:ExampleDirective#link
	 * @methodOf cmm.app.directives.directive:ExampleDirective
	 *
	 * @param {service} scope - The Scope of the current DOM Element.  Depending on the DDO, could be shared or isolate
	 * @param {DOMElement} element - A jqLite wrapped instance of the current DOM Element
	 * @param {object} attributes - The Attributes of the current DOM Element
	 *
	 * @description
	 * This is the shorthand equivalent of the `$compile` Post-Link Function
	 */
	function link(scope, element, attributes) {
		//Register the click Event listener
		element.on('click', clickListenerCallback);

		//Register the $destroy Event listener
		scope.$on('$destroy', destroyListenerCallback);

		/**
		 * @ngdoc method
		 * @name cmm.app.directives.directive:ExampleDirective#clickListenerCallback
		 * @methodOf cmm.app.directives.directive:ExampleDirective
		 * @listens click
		 *
		 * @description
		 * This method is called when the `click` Event is triggered on the current DOM Element.  It will do or
		 * not do something based on certain data conditions when the Event is triggered.
		 */
		function clickListenerCallback() {
			//Check to see if a click message has been supplied and display flag is true
			if (scope.message && scope.message.trim() !== '' && utilityService.isTruthy(attributes.displayMessage)) {
				window.alert(`Element clicked: ${scope.message}`); //eslint-disable-line no-alert
			}
			else {
				console.debug('Click message was not supplied or display flag is not true, nothing to display to user'); //eslint-disable-line no-console
			}
		}

		/**
		 * @ngdoc method
		 * @name cmm.app.directives.directive:ExampleDirective#destroyListenerCallback
		 * @methodOf cmm.app.directives.directive:ExampleDirective
		 * @listens $destroy
		 *
		 * @param {$destroy} event - The triggered Event
		 *
		 * @description
		 * This method is called when the `$destroy` Event is triggered on the current Scope.  It cleans up after itself
		 * to prevent any memory leaks, such as un-registering any Event listeners so that duplicate ones are not recreated
		 * should another instance of this directive be compiled.
		 */
		function destroyListenerCallback(event) {
			console.debug('This is what a $destroy Event looks like: ', event); //eslint-disable-line no-console

			//Unregister the `click` Event
			element.off('click', clickListenerCallback);
		}
	}

	return {
		'restrict': 'EA',
		'templateUrl': 'directives/example.html',
		'scope': {
			'title': '@',
			'message': '@clickMessage'
		},
		'link': link
	};
}

export default {
	'name': 'exampleDirective',
	'fn': ExampleDirective
};
