var expect = require('expect.js');
require('../dist/linq.js');

describe('aggregate', function () {

	it('Should apply an accumulator over a sequence', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var result = arr.aggregate(function (a, b) {
			return a + b;
		}, 0);

		expect(result).to.be.a('number');
		expect(result).to.be(15);
		done();
	});

});