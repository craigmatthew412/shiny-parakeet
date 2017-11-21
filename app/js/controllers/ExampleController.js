'use strict';

/**
 * @ngdoc controller
 * @name cmm.app.controllers.controller:ExampleController
 * @this
 *
 * @param {string} _myResolvedData - State resolved data containing a random String
 * @param {service} exampleService - The {@link cmm.app.services.service:exampleService exampleService} Example Service
 *
 * @description
 * Here is a sample description for a sample Controller.  It
 * can be multiple lines long, or as long as you really need it to be.
 */
function ExampleController(_myResolvedData, exampleService) {
	'ngInject';

	/**
	 * @ngdoc property
	 * @name cmm.app.controllers.controller:ExampleController#title
	 * @propertyOf cmm.app.controllers.controller:ExampleController
	 * @type {string}
	 *
	 * @description
	 * This is the description for a property on the sample Controller.  It is a string!
	 */
	this.title = 'Written with keyboards and bourbon! And more bourbon!';

	/**
	 * @ngdoc property
	 * @name cmm.app.controllers.controller:ExampleController#number
	 * @propertyOf cmm.app.controllers.controller:ExampleController
	 * @type {number}
	 *
	 * @description
	 * This is the description for a property on the sample Controller.  It is a number!
	 */
	this.number = 1234;

	/**
	 * @ngdoc property
	 * @name cmm.app.controllers.controller:ExampleController#bindedScopeValue
	 * @propertyOf cmm.app.controllers.controller:ExampleController
	 * @type {string}
	 *
	 * @description
	 * This is an example of a property which is binded to the isolate scope of a directive.
	 */
	this.bindedScopeValue = 'My Own Directive';

	/**
	 * @ngdoc property
	 * @name cmm.app.controllers.controller:ExampleController#myResolvedData
	 * @propertyOf cmm.app.controllers.controller:ExampleController
	 * @type {string}
	 *
	 * @description
	 * This is an example of a property which is resolved from the State config
	 */
	this.myResolvedData = '';

	/*--------------- METHOD DECLARATIONS (Private methods) ---------------*/
	/**
	 * @ngdoc method
	 * @name cmm.app.controllers.controller:ExampleController:initialize
	 * @methodOf cmm.app.controllers.controller:ExampleController
	 *
	 * @description
	 * The initialize method of the controller does any modifications or manipulations to data in order to prepare it for
	 * rendering in the view.  It might be taking resolved State data and passing it into a Service method for sorting
	 * or manipulation.
	 */
	const initialize = () => {
		this.myResolvedData = _myResolvedData;
	};

	/**
	 * @ngdoc method
	 * @name cmm.app.controllers.controller:ExampleController#myViewFunction
	 * @methodOf cmm.app.controllers.controller:ExampleController
	 *
	 * @description
	 * This is a method on the controller.  Since it uses ES6 arror functions, it has access to 'this' scope lexically
	 */
	const myViewFunction = () => {
		console.debug('The number on this controller is: ', this.number); //eslint-disable-line no-console

		//Lets call a function on our service
		this.privateProperty = exampleService.doThing();
	};

	/*--------------- METHOD CALLS ---------------*/
	initialize();

	/*--------------- EXPORTS ---------------*/
	this.myViewFunction = myViewFunction;
}

export default {
	'name': 'ExampleController',
	'fn': ExampleController
};
