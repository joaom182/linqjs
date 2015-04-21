var expect = require('expect.js');
require('../dist/linq.js');

describe('remove', function () {

	it('Should remove the first occurrence of a specific object from the Array', function (done) {
		var arr = [1, 2, 3, 4, 5];
		arr.remove(2);

		expect(arr).to.be.an(Array);
		expect(arr).to.be.eql([1, 3, 4, 5]);
		done();
	});

});