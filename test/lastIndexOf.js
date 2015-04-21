var expect = require('expect.js');
require('../dist/linq.js');

describe('lastIndexOf', function () {

	it('Should return the last index element of a sequence', function (done) {
		var arr = [1, 2, 3, 4, 5, 3, 4, 5];
		var result = arr.lastIndexOf(3);

		expect(result).to.be.a('number');
		expect(result).to.be(5);
		done();
	});

});