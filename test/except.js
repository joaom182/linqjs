var expect = require('expect.js');
require('../dist/linq.js');

describe('except', function () {

	it('Should produce the set difference of two sequences', function (done) {
		var arr1 = [1, 2, 3, 4, 5];
		var arr2 = [2, 3, 4];
		var res = arr1.except(arr2);

		expect(res).to.be.an(Array);
		expect(res).to.be.eql([1, 5]);
		done();
	});

});