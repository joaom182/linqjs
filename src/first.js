(function () {
	'use strict';

	Array.prototype.first = function (predicate, def) {
		var l = this.length;
		if (!predicate) return l ? this[0] : def == null ? null : def;
		for (var i = 0; i < l; i++) {
			if (predicate(this[i], i, this))
				return this[i];
		}

		return def == null ? null : def;
	};

}());
