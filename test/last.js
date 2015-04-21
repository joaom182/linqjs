var expect = require('expect.js');
require('../dist/linq.js');

describe('last', function () {

	it('Should return the last element of a sequence without comparer', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var res = arr.last();

		expect(res).to.be.an('number');
		expect(res).to.be.eql(5);
		done();
	});

	it('Should return the last element of a sequence with a comparer', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var res = arr.last(function (t) {
			return t > 2;
		});

		expect(res).to.be.an('number');
		expect(res).to.be.eql(5);
		done();
	});

	it('Should return the default value', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var res = arr.last(function (t) {
			return t > 6;
		}, 10);

		expect(res).to.be.an('number');
		expect(res).to.be.eql(10);
		done();
	});

});