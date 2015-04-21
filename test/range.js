var expect = require('expect.js');
require('../dist/linq.js');

describe('range', function () {

	it('Should return a numerical sequence based on the start and end parameters', function (done) {
		var result = Array.range(1, 5);

		expect(result).to.be.an(Array);
		expect(result).to.be.eql([1, 2, 3, 4, 5]);
		done();
	});

});