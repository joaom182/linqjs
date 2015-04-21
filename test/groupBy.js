var expect = require('expect.js');
require('../dist/linq.js');

describe('groupBy', function () {

	it('Should groups the elements of a sequence according to a specified key selector function', function (done) {
		var arr = [{
			Name: 'A',
			Val: 1
		}, {
			Name: 'B',
			Val: 1
		}, {
			Name: 'C',
			Val: 2
		}, {
			Name: 'D',
			Val: 2
		}];

		var res = arr.groupBy(function (t) {
			return t.Val;
		});

		expect(res).to.be.an(Array);

		res.forEach(function (t) {
			expect(t.key).to.be.a('number');
			expect(t.length).to.be(2);
		});
		done();
	});

});