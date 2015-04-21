var expect = require('expect.js');
require('../dist/linq.js');

describe('selectMany', function () {

	it('Should projects each element of a sequence to an array and flattens the resulting sequences into one sequence, using default result selector', function (done) {
		var arr = [{
			Name: 'A',
			Values: [1, 2, 3, 4]
		}, {
			Name: 'B',
			Values: [5, 6, 7, 8]
		}];
		var result = arr.selectMany(function (t) {
			return t.Values;
		});

		expect(result).to.be.an(Array);
		expect(result).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8]);
		done();
	});

	it('Should projects each element of a sequence to an array and flattens the resulting sequences into one sequence, using custom result selector', function (done) {
		var arr = [{
			Name: 'A',
			Values: [1, 2, 3, 4]
		}, {
			Name: 'B',
			Values: [5, 6, 7, 8]
		}];
		var result = arr.selectMany(function (t) {
			return t.Values;
		}, function (t, u) {
			return {
				Name: t.Name,
				Val: u
			};
		});

		expect(result).to.be.an(Array);
		expect(result).to.be.eql([{
				Name: 'A',
				Val: 1
		},
			{
				Name: 'A',
				Val: 2
		},
			{
				Name: 'A',
				Val: 3
		},
			{
				Name: 'A',
				Val: 4
		},
			{
				Name: 'B',
				Val: 5
		},
			{
				Name: 'B',
				Val: 6
		},
			{
				Name: 'B',
				Val: 7
		},
			{
				Name: 'B',
				Val: 8
		}]);
		done();
	});

});