var expect = require('expect.js');
require('../dist/linq.js');

describe('takeWhile', function () {

	it('Should return elements from a sequence as long as a specified condition is true, and then skips the remaining elements', function (done) {
		var arr = [1, 2, 3, 4, 5, 6, 7, 8];
		var res = arr.takeWhile(function (t) {
			return t % 4 !== 0;
		});

		expect(res).be.an(Array);
		expect(res).be.eql([1, 2, 3]);

		done();
	});

});