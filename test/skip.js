var expect = require('expect.js');
require('../dist/linq.js');

describe('skip', function () {

	it('Should bypass a specified number of elements in a sequence and then returns the remaining elements', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var res = arr.skip(2);

		expect(res).be.an(Array);
		expect(res).be.eql([3, 4, 5]);

		done();
	});

});