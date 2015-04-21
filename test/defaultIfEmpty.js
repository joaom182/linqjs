var expect = require('expect.js');
require('../dist/linq.js');

describe('defaultIfEmpty', function () {

	it('Should return the elements of the specified sequence or the specified value in a singleton collection if the sequence is empty', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var result = arr.where(function (t) {
			return t > 5;
		}).defaultIfEmpty(5);

		expect(result).to.be.an(Array);
		expect(result).to.eql([5]);
		done();
	});

	it('Should not return the elements of the specified sequence or the specified value in a singleton collection if the sequence is empty', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var result = arr.where(function (t) {
			return t < 5;
		}).defaultIfEmpty(5);

		expect(result).to.be.an(Array);
		expect(result).to.eql([1, 2, 3, 4]);
		done();
	});

});