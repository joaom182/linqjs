var expect = require('expect.js');
require('../dist/linq.js');

describe('max', function () {

	it('Should return the maximum value in a sequence of values without a comparer', function (done) {
		var arr = [1, 2, 3, 4, 5, 6, 7, 8];
		var result = arr.max();

		expect(result).to.be.a('number');
		expect(result).to.be.eql(8);
		done();
	});

	it('Should return the maximum value in a sequence of values with a comparer', function (done) {
		var arr2 = [{
			Name: 'A',
			Val: 1
		}, {
			Name: 'B',
			Val: 2
		}];
		var result = arr2.max(function (t) {
			return t.Val;
		});

		expect(result).to.be.a('number');
		expect(result).to.be.eql(2);
		done();
	});

});