(function () {
	'use strict';

	Array.prototype.min = function (s) {
		s = s || linq.Selector;
		var l = this.length;
		var min = s(this[0]);
		while (l-- > 0)
			if (s(this[l]) < min) min = s(this[l]);
		return min;
	};

}());