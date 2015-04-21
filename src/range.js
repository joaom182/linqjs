(function () {
	'use strict';

	Array.range = function (start, count) {
		var arr = [];
		while (count-- > 0) {
			arr.push(start++);
		}
		return arr;
	};

}());