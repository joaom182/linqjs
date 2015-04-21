(function () {
	'use strict';

	Array.prototype.takeWhile = function (predicate) {
		predicate = predicate || linq.Predicate;
		var l = this.length;
		var arr = [];
		for (var i = 0; i < l && predicate(this[i], i) === true; i++)
			arr.push(this[i]);

		return arr;
	};

}());