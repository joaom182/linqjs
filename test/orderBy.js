var expect = require('expect.js');
require('../dist/linq.js');

describe('orderBy', function () {

	it('Should sort the elements of a sequence in ascending order according to a key without a comparer', function (done) {
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
		var res1 = arr.orderBy(function (t) {
			return t.Val;
		});

		expect(res1).to.be.an(Array);
		expect(res1[0].Name).to.be.eql('A');
		expect(res1[0].Val).to.be.eql(1);
		expect(res1[1].Name).to.be.eql('B');
		expect(res1[1].Val).to.be.eql(1);
		expect(res1[2].Name).to.be.eql('a');
		expect(res1[2].Val).to.be.eql(2);
		expect(res1[3].Name).to.be.eql('C');
		expect(res1[3].Val).to.be.eql(2);

		done();
	});

	it('Should sort the elements of a sequence in ascending order according to a key with a comparer', function (done) {
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
		var res1 = arr.orderBy(function (t) {
			return t.Name
		}, function (a, b) {
			if (a.toUpperCase() > b.toUpperCase()) return 1;
			if (a.toUpperCase() < b.toUpperCase()) return -1;
			return 0;
		});

		expect(res1).to.be.an(Array);
		expect(res1[0].Name).to.be.eql('A');
		expect(res1[0].Val).to.be.eql(1);
		expect(res1[1].Name).to.be.eql('a');
		expect(res1[1].Val).to.be.eql(2);
		expect(res1[2].Name).to.be.eql('B');
		expect(res1[2].Val).to.be.eql(1);
		expect(res1[3].Name).to.be.eql('C');
		expect(res1[3].Val).to.be.eql(2);

		done();
	});

});