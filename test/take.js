var expect = require('expect.js');
require('../dist/linq.js');

describe('take', function () {

	it('Should return a specified number of contiguous elements from the start of a sequence', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var res = arr.take(2);

		expect(res).be.an(Array);
		expect(res).be.eql([1, 2]);

		done();
	});

});