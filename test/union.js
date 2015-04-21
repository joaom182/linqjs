var expect = require('expect.js');
require('../dist/linq.js');

describe('union', function () {

	it('Should produce the set union of two sequences by using the default equality comparer', function (done) {
		var arr1 = [1, 2, 3, 4, 5];
		var arr2 = [5, 6, 7, 8, 9];
		var res = arr1.union(arr2);

		expect(res).be.an(Array);
		expect(res).be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);

		done();
	});

});