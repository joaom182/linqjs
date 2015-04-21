(function () {
	'use strict';

	Array.prototype.innerJoin = function (arr, outer, inner, result, comparer) {
		comparer = comparer || linq.EqualityComparer;
		var res = [];

		this.forEach(function (t) {
			arr.where(function (u) {
					return comparer(outer(t), inner(u));
				})
				.forEach(function (u) {
					res.push(result(t, u));
				});
		});

		return res;
	};

}());