var expect = require('expect.js');
require('../dist/linq.js');

describe('indexOf', function () {

	it('Should return the element index of a sequence', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var result = arr.indexOf(2);

		expect(result).to.be.a('number');
		expect(result).to.be(1);
		done();
	});

});