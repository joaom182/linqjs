(function () {
	'use strict';

	Array.prototype.except = function (arr, comparer) {
		if (!(arr instanceof Array)) arr = [arr];
		comparer = comparer || linq.EqualityComparer;
		var l = this.length;
		var res = [];
		for (var i = 0; i < l; i++) {
			var k = arr.length;
			var t = false;
			while (k-- > 0) {
				if (comparer(this[i], arr[k]) === true) {
					t = true;
					break;
				}
			}
			if (!t) res.push(this[i]);
		}
		return res;
	};

}());