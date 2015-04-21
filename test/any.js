var expect = require('expect.js');
require('../dist/linq.js');

describe('any', function () {

	it('Should return false to an empty array', function (done) {
		var a = [];
		var result = a.any();

		expect(result).to.be(false);
		done();
	});

	it('Should return true to an populated array', function (done) {
		var a = [1];
		var result = a.any();

		expect(result).to.be(true);
		done();
	});

	it('Should return true to an populated array with predicate', function (done) {
		var a = [1];
		var result = a.any(function (n) {
			return n == 1;
		});

		expect(result).to.be(true);
		done();
	});

	it('Should return false to an populated array with predicate', function (done) {
		var a = [1];
		var result = a.any(function (n) {
			return n != 1;
		});

		expect(result).to.be(false);
		done();
	});

});