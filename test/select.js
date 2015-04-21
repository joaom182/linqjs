var expect = require('expect.js');
require('../dist/linq.js');

describe('select', function () {

	it('Should project each element of a sequence into a new form', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var result = arr.select(function (t) {
			return t * 2;
		});

		expect(result).to.be.an(Array);
		expect(result).to.be.eql([2, 4, 6, 8, 10]);
		done();
	});

});