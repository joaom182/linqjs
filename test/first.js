var expect = require('expect.js');
require('../dist/linq.js');

describe('first', function () {

	it('Should return the first element of a sequence without comparer', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var res = arr.first();

		expect(res).to.be.an('number');
		expect(res).to.be.eql(1);
		done();
	});

	it('Should return the first element of a sequence with a comparer', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var res = arr.first(function (t) {
			return t > 2;
		});

		expect(res).to.be.an('number');
		expect(res).to.be.eql(3);
		done();
	});

	it('Should return the default value', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var res = arr.first(function (t) {
			return t > 6;
		}, 10);

		expect(res).to.be.an('number');
		expect(res).to.be.eql(10);
		done();
	});

});