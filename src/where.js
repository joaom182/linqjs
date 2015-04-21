(function () {
	'use strict';

	var global = global;
	var window = window || global;

	Array.prototype.where = Array.prototype.filter || function (predicate, context) {
		context = context || window;
		var arr = [];
		var l = this.length;
		for (var i = 0; i < l; i++)
			if (Predicate.call(context, this[i], i, this) === true) arr.push(this[i]);
		return arr;
	};

}());