var expect = require('expect.js');
require('../dist/linq.js');

describe('toDictionary', function () {

	it('Should creates an object from an array according to a specified key selector function', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var res = arr.toDictionary(function (t) {
			return 'Num' + t;
		}, function (u) {
			return u;
		});

		expect(res).be.a('object');
		expect(res).be.eql({
			Num5: 5,
			Num4: 4,
			Num3: 3,
			Num2: 2,
			Num1: 1
		});

		done();
	});

});