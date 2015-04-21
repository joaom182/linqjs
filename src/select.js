(function () {
	'use strict';

	var global = global;
	var window = window || global;

	Array.prototype.select = Array.prototype.map || function (selector, context) {
		context = context || window;
		var arr = [];
		var l = this.length;
		for (var i = 0; i < l; i++)
			arr.push(Selector.call(context, this[i], i, this));
		return arr;
	};

}());