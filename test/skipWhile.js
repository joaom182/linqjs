var expect = require('expect.js');
require('../dist/linq.js');

describe('skipWhile', function () {

	it('Should bypass elements in a sequence as long as a specified condition is true and then returns the remaining elements', function (done) {
		var arr = [1, 2, 3, 4, 5, 6, 7, 8];
		var res = arr.skipWhile(function (t) {
			return t % 4 !== 0;
		});

		expect(res).be.an(Array);
		expect(res).be.eql([4, 5, 6, 7, 8]);

		done();
	});

});