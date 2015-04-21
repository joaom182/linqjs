(function () {
	'use strict';

	Array.prototype.groupJoin = function (arr, outer, inner, result, comparer) {
		comparer = comparer || linq.EqualityComparer;
		return this
			.select(function (t) {
				var key = outer(t);
				return {
					outer: t,
					inner: arr.where(function (u) {
						return comparer(key, inner(u));
					}),
					key: key
				};
			})
			.select(function (t) {
				t.inner.key = t.key;
				return result(t.outer, t.inner);
			});
	};

}());