var expect = require('expect.js');
require('../dist/linq.js');

describe('innerJoin', function () {

	it('Should correlates the elements of two sequences based on matching keys without comparer', function (done) {
		var arr1 = [{
			Name: 'A',
			Val: 1
		}, {
			Name: 'B',
			Val: 2
		}, {
			Name: 'C',
			Val: 3
		}];

		var arr2 = [{
			Code: 'A'
		}, {
			Code: 'B'
		}, {
			Name: 'C',
			Code: 'C'
		}];

		var res1 = arr1.innerJoin(arr2,
			function (t) {
				return t.Name;
			},
			function (u) {
				return u.Code;
			},
			function (t, u) {
				return {
					Name: t.Name,
					Val: t.Val,
					Code: u.Code
				};
			});

		expect(res1).to.be.an(Array);
		expect(res1[0]).to.be.eql({
			Code: 'A',
			Name: 'A',
			Val: 1
		});

		expect(res1[1]).to.be.eql({
			Code: 'B',
			Name: 'B',
			Val: 2
		});

		expect(res1[2]).to.be.eql({
			Code: 'C',
			Name: 'C',
			Val: 3
		});

		done();
	});

	it('Should correlates the elements of two sequences based on matching keys with comparer', function (done) {
		var arr1 = [{
			Name: 'A',
			Val: 1
		}, {
			Name: 'B',
			Val: 2
		}, {
			Name: 'C',
			Val: 3
		}];

		var arr2 = [{
			Code: 'A'
		}, {
			Code: 'B'
		}, {
			Name: 'C',
			Code: 'C'
		}];

		var res2 = arr1.innerJoin(arr2,
			function (t) {
				return t.Name;
			},
			function (u) {
				return u.Code;
			},
			function (t, u) {
				return {
					Name: t.Name,
					Val: t.Val,
					Code: u.Code
				};
			},
			function (a, b) {
				return a.toUpperCase() == b.toUpperCase();
			});

		expect(res2).to.be.an(Array);
		expect(res2[0]).to.be.eql({
			Code: 'A',
			Name: 'A',
			Val: 1
		});

		expect(res2[1]).to.be.eql({
			Code: 'B',
			Name: 'B',
			Val: 2
		});

		expect(res2[2]).to.be.eql({
			Code: 'C',
			Name: 'C',
			Val: 3
		});

		done();
	});

});