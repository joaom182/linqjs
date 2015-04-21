var expect = require('expect.js');
require('../dist/linq.js');

describe('intersect', function () {

	it('Should produce the set intersection of two sequences', function (done) {
		var arr1 = [1, 2, 3, 4, 5];
		var arr2 = [1, 2, 3];
		var res = arr1.intersect(arr2);

		expect(res).to.be.an(Array);
		expect(res).to.be.eql([1, 2, 3]);
		done();
	});

});