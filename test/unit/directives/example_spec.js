'use strict';

describe('Unit: ExampleDirective', () => {
	//Injectables
	let scope;

	//Variables
	let element;

	//Before each `it`
	beforeEach(() => {
		//Instantiate the app module
		angular.mock.module('cmm.app');

		//Inject services/constants
		angular.mock.inject((_$compile_, _$rootScope_) => {
			//Create a new child Scope
			scope = _$rootScope_.$new();

			//Set Scope properties
			scope.title = 'A sample title';
			scope.message = 'A sample message';
			scope.displayMessage = true;

			//Define Element
			element = angular.element('<div example-directive data-title="{{ title }}" data-click-message="{{ message }}" data-display-message="{{ displayMessage }}">Sample Directive</div>');

			//Comepile Element with the Scope
			_$compile_(element)(scope);

			//Trigger a Digest Cycle
			scope.$digest();
		});

		//Set up spy
		spyOn(window, 'alert');
	});

	it('should bind itself to the element', () => {
		//Trigger the Event
		element.triggerHandler('click');

		//Expect the alert window to contain the message
		expect(window.alert).toHaveBeenCalledWith(`Element clicked: ${scope.message}`);
	});

	it('should update its bindings', () => {
		//Change Scope properties
		scope.message = 'A new sample message';
		scope.displayMessage = false;

		//Trigger a Digest Cycle
		scope.$digest();

		//Trigger the Event
		element.triggerHandler('click');

		//Expect the alert to not be called now since we set displayMessage to false
		expect(window.alert).not.toHaveBeenCalled();
	});

	it('should bind a title property to its template', () => {
		//Expect that the view has the binded scope property
		expect(element.find('h1').text()).toBe(`Directive title: ${scope.title}`);
	});
});
