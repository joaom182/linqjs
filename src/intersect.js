(function () {
	'use strict';

	Array.prototype.intersect = function (arr, comparer) {
		comparer = comparer || linq.EqualityComparer;
		return this.distinct(comparer).where(function (t) {
			return arr.contains(t, comparer);
		});
	};

}());