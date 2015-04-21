(function () {
	'use strict';

	Array.prototype.lastIndexOf = Array.prototype.lastIndexOf || function (o, index) {
		var l = Math.max(Math.min(index || this.length, this.length), 0);
		while (l-- > 0)
			if (this[l] === o) return l;
		return -1;
	};

}());