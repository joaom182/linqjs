Array.prototype.all = function (predicate, context) {
	var window = window || {};
	context = context || window;
	predicate = predicate || Predicate;
	var f = this.every || function (p, c) {
		return this.length == this.where(p, c).length;
	};
	return f.apply(this, [predicate, context]);
};