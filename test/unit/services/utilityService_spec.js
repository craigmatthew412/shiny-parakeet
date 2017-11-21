'use strict';

describe('Unit: utilityService', () => {
	//Injectables
	let utilityService;

	//Undefined
	let undefinedVar;

	//True possibilities
	const trueString = 'true';
	const trueStringUppercase = 'TRUE';
	const yesString = 'yes';
	const yesStringUppercase = 'YES';
	const yesChar = 'y';
	const yesCharUppercase = 'Y';
	const trueIntString = '1';
	const trueInt = 1;
	const trueBoolean = true;

	//False possibilities
	const falseString = 'false';
	const falseStringUppercase = 'FALSE';
	const noString = 'no';
	const noStringUppercase = 'NO';
	const noChar = 'n';
	const noCharUppercase = 'N';
	const falseIntString = '0';
	const falseInt = 0;
	const falseBoolean = false;

	//Before each `it`
	beforeEach(() => {
		//Instantiate the app module
		angular.mock.module('cmm.app');

		//Inject services/constants
		angular.mock.inject((_utilityService_) => {
			utilityService = _utilityService_;
		});
	});

	it('should exist', () => {
		expect(utilityService).toBeDefined();
	});

	it('generateUUID() should return a valid String UUID/GUID', () => {
		//Get the UUID
		const uuid = utilityService.generateUUID();

		//Should be defined
		expect(uuid).toBeDefined();

		//Should be a String
		expect(typeof uuid).toBe('string');
	});

	it('isTruthy() should return positive true for lowercase String \'true\'', () => {
		//Test that isTruthy() returns positive true for lowercase String 'true'
		expect(utilityService.isTruthy(trueString)).toBe(true);
	});

	it('isTruthy() should return negative true for lowercase String \'true\'', () => {
		//Test that isTruthy() returns negative true for lowercase String 'true'
		expect(!utilityService.isTruthy(trueString)).not.toBe(true);
	});

	it('isTruthy() should return positive true for uppercase String \'TRUE\'', () => {
		//Test that isTruthy() returns positive true for uppercase String 'TRUE'
		expect(utilityService.isTruthy(trueStringUppercase)).toBe(true);
	});

	it('isTruthy() should return negative true for uppercase String \'TRUE\'', () => {
		//Test that isTruthy() returns negative true for uppercase String 'TRUE'
		expect(!utilityService.isTruthy(trueStringUppercase)).not.toBe(true);
	});

	it('isTruthy() should return positive true for lowercase String \'yes\'', () => {
		//Test that isTruthy() returns positive true for lowercase String 'yes'
		expect(utilityService.isTruthy(yesString)).toBe(true);
	});

	it('isTruthy() should return negative true for lowercase String \'yes\'', () => {
		//Test that isTruthy() returns negative true for lowercase String 'yes'
		expect(!utilityService.isTruthy(yesString)).not.toBe(true);
	});

	it('isTruthy() should return positive true for uppercase String \'YES\'', () => {
		//Test that isTruthy() returns positive true for uppercase String 'YES'
		expect(utilityService.isTruthy(yesStringUppercase)).toBe(true);
	});

	it('isTruthy() should return negative true for uppercase String \'YES\'', () => {
		//Test that isTruthy() returns negative true for uppercase String 'YES'
		expect(!utilityService.isTruthy(yesStringUppercase)).not.toBe(true);
	});

	it('isTruthy() should return positive true for lowercase Character \'y\'', () => {
		//Test that isTruthy() returns positive true for lowercase Character 'y'
		expect(utilityService.isTruthy(yesChar)).toBe(true);
	});

	it('isTruthy() should return negative true for lowercase Character \'y\'', () => {
		//Test that isTruthy() returns negative true for lowercase Character 'y'
		expect(!utilityService.isTruthy(yesChar)).not.toBe(true);
	});

	it('isTruthy() should return positive true for uppercase Character \'Y\'', () => {
		//Test that isTruthy() returns positive true for uppercase Character 'Y'
		expect(utilityService.isTruthy(yesCharUppercase)).toBe(true);
	});

	it('isTruthy() should return negative true for uppercase Character \'Y\'', () => {
		//Test that isTruthy() returns negative true for uppercase Character 'Y'
		expect(!utilityService.isTruthy(yesCharUppercase)).not.toBe(true);
	});

	it('isTruthy() should return positive true for String Number \'1\'', () => {
		//Test that isTruthy() returns positive true for String Number '1'
		expect(utilityService.isTruthy(trueIntString)).toBe(true);
	});

	it('isTruthy() should return negative true for String Number \'1\'', () => {
		//Test that isTruthy() returns negative true for String Number '1'
		expect(!utilityService.isTruthy(trueIntString)).not.toBe(true);
	});

	it('isTruthy() should return positive true for Integer Number \'1\'', () => {
		//Test that isTruthy() returns positive true for Integer Number '1'
		expect(utilityService.isTruthy(trueInt)).toBe(true);
	});

	it('isTruthy() should return negative true for Integer Number \'1\'', () => {
		//Test that isTruthy() returns negative true for Integer Number '1'
		expect(!utilityService.isTruthy(trueInt)).not.toBe(true);
	});

	it('isTruthy() should return positive false for lowercase String \'false\'', () => {
		//Test that isTruthy() returns positive false for lowercase String 'false'
		expect(utilityService.isTruthy(falseString)).toBe(false);
	});

	it('isTruthy() should return negative false for lowercase String \'false\'', () => {
		//Test that isTruthy() returns negative false for lowercase String 'false'
		expect(!utilityService.isTruthy(falseString)).not.toBe(false);
	});

	it('isTruthy() should return positive false for uppercase String \'FALSE\'', () => {
		//Test that isTruthy() returns positive false for uppercase String 'FALSE'
		expect(utilityService.isTruthy(falseStringUppercase)).toBe(false);
	});

	it('isTruthy() should return negative false for uppercase String \'FALSE\'', () => {
		//Test that isTruthy() returns negative false for uppercase String 'FALSE'
		expect(!utilityService.isTruthy(falseStringUppercase)).not.toBe(false);
	});

	it('isTruthy() should return positive false for lowercase String \'no\'', () => {
		//Test that isTruthy() returns positive false for lowercase String 'no'
		expect(utilityService.isTruthy(noString)).toBe(false);
	});

	it('isTruthy() should return negative false for lowercase String \'no\'', () => {
		//Test that isTruthy() returns negative false for lowercase String 'no'
		expect(!utilityService.isTruthy(noString)).not.toBe(false);
	});

	it('isTruthy() should return positive false for uppercase String \'NO\'', () => {
		//Test that isTruthy() returns positive false for uppercase String 'NO'
		expect(utilityService.isTruthy(noStringUppercase)).toBe(false);
	});

	it('isTruthy() should return negative false for uppercase String \'NO\'', () => {
		//Test that isTruthy() returns negative false for uppercase String 'NO'
		expect(!utilityService.isTruthy(noStringUppercase)).not.toBe(false);
	});

	it('isTruthy() should return positive false for lowercase Character \'n\'', () => {
		//Test that isTruthy() returns positive false for lowercase Character 'n'
		expect(utilityService.isTruthy(noChar)).toBe(false);
	});

	it('isTruthy() should return negative false for lowercase Character \'n\'', () => {
		//Test that isTruthy() returns negative false for lowercase Character 'n'
		expect(!utilityService.isTruthy(noChar)).not.toBe(false);
	});

	it('isTruthy() should return positive false for uppercase Character \'N\'', () => {
		//Test that isTruthy() returns positive false for uppercase Character 'N'
		expect(utilityService.isTruthy(noCharUppercase)).toBe(false);
	});

	it('isTruthy() should return negative false for uppercase Character \'N\'', () => {
		//Test that isTruthy() returns negative false for uppercase Character 'N'
		expect(!utilityService.isTruthy(noCharUppercase)).not.toBe(false);
	});

	it('isTruthy() should return positive false for String Number \'0\'', () => {
		//Test that isTruthy() returns positive false for String Number '0'
		expect(utilityService.isTruthy(falseIntString)).toBe(false);
	});

	it('isTruthy() should return negative false for String Number \'0\'', () => {
		//Test that isTruthy() returns negative false for String Number '0'
		expect(!utilityService.isTruthy(falseIntString)).not.toBe(false);
	});

	it('isTruthy() should return positive false for Integer Number \'0\'', () => {
		//Test that isTruthy() returns positive false for Integer Number '0'
		expect(utilityService.isTruthy(falseInt)).toBe(false);
	});

	it('isTruthy() should return negative false for Integer Number \'0\'', () => {
		//Test that isTruthy() returns negative false for Integer Number '0'
		expect(!utilityService.isTruthy(falseInt)).not.toBe(false);
	});

	it('isTruthy() should return positive true for Boolean true', () => {
		//Test that isTruthy() returns positive true for Boolean true
		expect(utilityService.isTruthy(trueBoolean)).toBe(true);
	});

	it('isTruthy() should return negative true for Boolean true', () => {
		//Test that isTruthy() returns negative true for Boolean true
		expect(!utilityService.isTruthy(trueBoolean)).not.toBe(true);
	});

	it('isTruthy() should return positive false for Boolean false', () => {
		//Test that isTruthy() returns positive false for Boolean false
		expect(utilityService.isTruthy(falseBoolean)).toBe(false);
	});

	it('isTruthy() should return negative false for Boolean false', () => {
		//Test that isTruthy() returns negative false for Boolean false
		expect(!utilityService.isTruthy(falseBoolean)).not.toBe(false);
	});

	it('isTruthy() should return positive false for anything else (i.e. undefined or null)', () => {
		//Test that isTruthy() returns positive false for anything else (i.e. undefined or null)
		expect(utilityService.isTruthy(undefinedVar)).toBe(false);
	});

	it('isTruthy() should return negative false for anything else (i.e. undefined or null)', () => {
		//Test that isTruthy() returns negative false for anything else (i.e. undefined or null)
		expect(!utilityService.isTruthy(undefinedVar)).not.toBe(false);
	});
});
