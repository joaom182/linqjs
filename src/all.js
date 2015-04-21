(function () {
	'use strict';

	var global = global;
	var window = window || global;

	Array.prototype.all = function (predicate, context) {
		context = context || window;
		predicate = predicate || linq.Predicate;
		var f = this.every || function (p, c) {
			return this.length == this.where(p, c).length;
		};
		return f.apply(this, [predicate, context]);
	};

}());
