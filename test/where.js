var expect = require('expect.js');
require('../dist/linq.js');

describe('where', function () {

	it('Should filter a sequence of values based on a predicate', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var res = arr.where(function (t) {
			return t > 2;
		});

		expect(res).be.an(Array);
		expect(res).be.eql([3, 4, 5]);

		done();
	});

});