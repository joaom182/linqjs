(function () {
	'use strict';

	Array.prototype.zip = function (arr, selector) {
		return this
			.take(Math.min(this.length, arr.length))
			.select(function (t, i) {
				return selector(t, arr[i]);
			});
	};

}());
