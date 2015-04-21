(function () {
	'use strict';

	Array.prototype.aggregate = Array.prototype.reduce || function (func, seed) {
		var arr = this.slice(0);
		var l = this.length;
		if (seed == null) seed = arr.shift();

		for (var i = 0; i < l; i++)
			seed = func(seed, arr[i], i, this);

		return seed;
	};

}());