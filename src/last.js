(function () {
	'use strict';

	Array.prototype.last = function (predicate, def) {
		var l = this.length;
		if (!predicate) return l ? this[l - 1] : def == null ? null : def;
		while (l-- > 0) {
			if (predicate(this[l], l, this))
				return this[l];
		}

		return def == null ? null : def;
	};

}());