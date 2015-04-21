var expect = require('expect.js');
require('../dist/linq.js');

describe('orderByDescending', function () {

	it('Should sort the elements of a sequence in descending order', function (done) {
		var arr = [{
			Name: 'A',
			Val: 1
		}, {
			Name: 'a',
			Val: 2
		}, {
			Name: 'B',
			Val: 1
		}, {
			Name: 'C',
			Val: 2
		}];
		var res = arr.orderByDescending(function (t) {
			return t.Name;
		});

		expect(res).to.be.an(Array);
		expect(res[0].Name).to.be.eql('A');
		expect(res[0].Val).to.be.eql(1);
		expect(res[1].Name).to.be.eql('a');
		expect(res[1].Val).to.be.eql(2);
		expect(res[2].Name).to.be.eql('B');
		expect(res[2].Val).to.be.eql(1);
		expect(res[3].Name).to.be.eql('C');
		expect(res[3].Val).to.be.eql(2);

		done();
	});

});