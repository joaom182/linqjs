Array.prototype.where = Array.prototype.filter || function (predicate, context) {
	var window = window || {};
	context = context || window;
	var arr = [];
	var l = this.length;
	for (var i = 0; i < l; i++)
		if (predicate.call(context, this[i], i, this) === true) arr.push(this[i]);
	return arr;
};