var expect = require('expect.js');
require('../dist/linq.js');

describe('distinct', function () {

	it('Should distinct elements from a sequence by using the default equality comparer to compare values', function (done) {
		var arr = [1, 2, 2, 3, 3, 4, 5, 5];
		var result = arr.distinct();

		var arr2 = [{
			Name: 'A',
			Val: 1
		}, {
			Name: 'B',
			Val: 1
		}];
		var result2 = arr2.distinct(function (a, b) {
			return a.Val == b.Val;
		});

		expect(result).to.be.an(Array);
		expect(result).to.eql([1, 2, 3, 4, 5]);
		expect(result2).to.be.an(Array);
		expect(result2).to.eql([{
			Name: 'A',
			Val: 1
		}]);

		done();
	});

});