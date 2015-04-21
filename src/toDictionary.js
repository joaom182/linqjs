(function () {
	'use strict';

	Array.prototype.toDictionary = function (keySelector, valueSelector) {
		var o = {};
		var l = this.length;
		while (l-- > 0) {
			var key = keySelector(this[l]);
			if (key == null || key === '') continue;
			o[key] = valueSelector(this[l]);
		}
		return o;
	};

}());