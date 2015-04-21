var expect = require('expect.js');
require('../dist/linq.js');

describe('contains', function () {

	it('Should contain a element of a sequence', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var result = arr.contains(2);

		expect(result).to.be(true);
		done();
	});

	it('Should not contain a element of a sequence', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var result = arr.contains(6);

		expect(result).to.be(false);
		done();
	});

});