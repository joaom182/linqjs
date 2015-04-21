var expect = require('expect.js');
require('../dist/linq.js');

describe('groupJoin', function () {

	it('Should groups the elements of a sequence according to a specified key selector function without a custom comparer', function (done) {
		var arr1 = [{
			Name: 'A',
			Val: 1
		}, {
			Name: 'B',
			Val: 2
		}, {
			Name: 'C',
			Val: 3
		}];

		var arr2 = [{
			Code: 'A'
		}, {
			Code: 'A'
		}, {
			Code: 'B'
		}, {
			Code: 'B'
		}, {
			Code: 'C'
		}];

		var res = arr1.groupJoin(arr2,
			function (t) {
				return t.Name;
			},
			function (u) {
				return u.Code;
			},
			function (t, u) {
				return {
					Item: t,
					Group: u
				};
			});

		expect(res).to.be.an(Array);
		expect(res.length).to.be.eql(3);

		expect(res[0].Group.key).to.be.a('string');
		expect(res[1].Group.key).to.be.a('string');
		expect(res[2].Group.key).to.be.a('string');

		expect(res[0].Group.key).to.be.eql('A');
		expect(res[1].Group.key).to.be.eql('B');
		expect(res[2].Group.key).to.be.eql('C');

		expect(res[0].Group[0].Code).to.be.eql('A');
		expect(res[0].Group[1].Code).to.be.eql('A');
		expect(res[1].Group[0].Code).to.be.eql('B');
		expect(res[1].Group[1].Code).to.be.eql('B');
		expect(res[2].Group[0].Code).to.be.eql('C');

		done();
	});


	it('Should groups the elements of a sequence according to a specified key selector function with a custom comparer', function (done) {
		var arr1 = [{
			Name: 'A',
			Val: 1
		}, {
			Name: 'B',
			Val: 2
		}, {
			Name: 'C',
			Val: 3
		}];

		var arr2 = [{
			Code: 'A'
		}, {
			Code: 'A'
		}, {
			Code: 'B'
		}, {
			Code: 'B'
		}, {
			Code: 'C'
		}];

		var res = arr1.groupJoin(arr2,
			function (t) {
				return t.Name;
			},
			function (u) {
				return u.Code;
			},
			function (t, u) {
				return {
					Item: t,
					Group: u
				};
			},
			function (a, b) {
				return a.toUpperCase() == b.toUpperCase();
			});

		expect(res).to.be.an(Array);
		expect(res.length).to.be.eql(3);

		expect(res[0].Group.key).to.be.a('string');
		expect(res[1].Group.key).to.be.a('string');
		expect(res[2].Group.key).to.be.a('string');

		expect(res[0].Group.key).to.be.eql('A');
		expect(res[1].Group.key).to.be.eql('B');
		expect(res[2].Group.key).to.be.eql('C');

		expect(res[0].Group[0].Code).to.be.eql('A');
		expect(res[0].Group[1].Code).to.be.eql('A');
		expect(res[1].Group[0].Code).to.be.eql('B');
		expect(res[1].Group[1].Code).to.be.eql('B');
		expect(res[2].Group[0].Code).to.be.eql('C');

		done();
	});

});