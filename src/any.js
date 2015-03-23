Array.prototype.any = function (predicate, context) {
	context = context || global || window;
	var f = this.some || function (p, c) {
		var l = this.length;
		if (!p) return l > 0;
		while (l-- > 0)
			if (p.call(c, this[l], l, this) === true) return true;
		return false;
	};
	return f.apply(this, [predicate, context]);
};