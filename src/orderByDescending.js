(function () {
	'use strict';

	Array.prototype.orderByDescending = function (selector, comparer) {
		comparer = comparer || linq.SortComparer;
		return this.orderBy(selector||linq.Selector, function (a, b) {
			return -comparer(a, b);
		});
	};

}());
