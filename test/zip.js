var expect = require('expect.js');
require('../dist/linq.js');

describe('zip', function () {

	it('Should apply a specified function to the corresponding elements of two sequences, which produces a sequence of the results', function (done) {
		var arr1 = [1, 2, 3, 4];
		var arr2 = ['A', 'B', 'C', 'D'];
		var res = arr1.zip(arr2, function (a, b) {
			return {
				Num: a,
				Letter: b
			};
		});

		expect(res).be.an(Array);
		expect(res).be.eql([{
			Num: 1,
			Letter: 'A'
		}, {
			Num: 2,
			Letter: 'B'
		}, {
			Num: 3,
			Letter: 'C'
		}, {
			Num: 4,
			Letter: 'D'
		}]);

		done();
	});

});