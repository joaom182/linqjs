(function () {
	'use strict';

	Array.prototype.contains = function (o, comparer) {
		comparer = comparer || linq.EqualityComparer;
		var l = this.length;
		while (l-- > 0)
			if (comparer(this[l], o) === true) return true;
		return false;
	};

}());