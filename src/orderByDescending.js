Array.prototype.orderByDescending = function (selector, comparer) {
	comparer = comparer || SortComparer;
	return this.orderBy(selector, function (a, b) { return -comparer(a, b) });
};