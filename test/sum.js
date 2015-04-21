var expect = require('expect.js');
require('../dist/linq.js');

describe('sum', function () {

	it('Should computes the sum of a sequence of numeric values', function (done) {
		var arr = [1, 2, 3, 4, 5, 6, 7, 8];
		var res = arr.sum();

		var arr2 = [{
			Name: 'A',
			Val: 1
		}, {
			Name: 'B',
			Val: 2
		}];
		var res2 = arr2.sum(function (t) {
			return t.Val;
		});

		expect(res).be.a('number');
		expect(res).be.eql(36);

		expect(res2).be.a('number');
		expect(res2).be.eql(3);

		done();
	});

});