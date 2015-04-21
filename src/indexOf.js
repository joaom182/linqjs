(function () {
	'use strict';

	Array.prototype.indexOf = Array.prototype.indexOf || function (o, index) {
		var l = this.length;
		for (var i = Math.max(Math.min(index, l), 0) || 0; i < l; i++)
			if (this[i] === o) return i;
		return -1;
	};

}());