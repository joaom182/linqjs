(function () {
	'use strict';

	Array.prototype.distinct = function (comparer) {
		var arr = [];
		var l = this.length;
		for (var i = 0; i < l; i++) {
			if (!arr.contains(this[i], comparer))
				arr.push(this[i]);
		}
		return arr;
	};

}());