var expect = require('expect.js');
require('../dist/linq.js');

describe('removeAll', function () {

	it('Should remove all the elements that match the conditions defined by the specified predicate', function (done) {
		var arr = [1, 2, 3, 4, 5];
		arr.removeAll(function (t) {
			return t % 2 === 0;
		});

		expect(arr).to.be.an(Array);
		expect(arr).to.be.eql([1, 3, 5]);
		done();
	});

});