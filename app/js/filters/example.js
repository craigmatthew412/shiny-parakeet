'use strict';

function baconFilter() {
	/**
	 * @ngdoc filter
	 * @name cmm.app.filters.filter:bacon
	 * @kind function
	 *
	 * @param {string} input - The string to parse through the filter
	 *
	 * @description
	 * This is a description for the filter.  It explains what it does.  Like for example, this filter accepts a String and
	 * finds all occurrences of the substring `bourbon` and replaces it with the substring `bacon`.
	 *
	 * @example
	    <example module="baconExample" name="bacon-filter">
	        <file name="index.html">
				 <script>
					 angular.module('baconExample', [])
					 .controller('ExampleController', ['$scope', function($scope) {
				             $scope.sampleString = 'Here comes some bourbon';
				           }]);
				 </script>
				 <div ng-controller="ExampleController">
	                <input type="text" ng-model="sampleString"> <br>
	                <span>{{ sampleString | bacon }}</span> <br>
				 </div>
	        </file>
	    </example>
	 */
	return (input) => {
		return input.replace(/bourbon/ig, 'bacon');
	};
}

export default {
	'name': 'bacon',
	'fn': baconFilter
};
