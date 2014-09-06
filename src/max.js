Array.prototype.max = function (s) {
	s = s || Selector;
	var l = this.length;
	var max = s(this[0]);
	while (l-- > 0)
		if (s(this[l]) > max) max = s(this[l]);
	return max;
};