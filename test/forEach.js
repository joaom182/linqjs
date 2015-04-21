var expect = require('expect.js');
require('../dist/linq.js');

describe('forEach', function () {

	it('Should perform the specified action on each element of the array', function (done) {
		var arr = [1, 2, 3, 4, 5];
		var sum = 0;
		arr.forEach(function (n) {
			sum += n;
		});

		expect(sum).to.be.an('number');
		expect(sum).to.be.eql(15);
		done();
	});

});