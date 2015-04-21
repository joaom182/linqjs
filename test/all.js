var expect = require('expect.js');
require('../dist/linq.js');

describe('all', function () {

	it('Should all elements of a sequence satisfy a condition', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var result = arr.all(function (t) {
			return t < 6;
		});

		expect(result).to.be(true);
		done();
	});

	it('Should all elements of a sequence not satisfy a condition', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var result = arr.all(function (t) {
			return t > 6;
		});

		expect(result).to.be(false);
		done();
	});

});