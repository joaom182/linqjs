(function () {
	'use strict';

	Array.prototype.sum = function (s) {
		s = s || linq.Selector;
		var l = this.length;
		var sum = 0;
		while (l-- > 0) sum += s(this[l]);
		return sum;
	};

}());