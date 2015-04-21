(function () {
	'use strict';

	Array.prototype.orderBy = function (selector, comparer) {
		comparer = comparer || linq.SortComparer;
		var arr = this.slice(0);
		var fn = function (a, b) {
			return comparer(selector(a), selector(b));
		};

		arr.thenBy = function (selector, comparer) {
			comparer = comparer || linq.SortComparer;
			return arr.orderBy(linq.Selector, function (a, b) {
				var res = fn(a, b);
				return res === 0 ? comparer(selector(a), selector(b)) : res;
			});
		};

		arr.thenByDescending = function (selector, comparer) {
			comparer = comparer || linq.SortComparer;
			return arr.orderBy(linq.Selector, function (a, b) {
				var res = fn(a, b);
				return res === 0 ? -comparer(selector(a), selector(b)) : res;
			});
		};

		return arr.sort(fn);
	};

}());