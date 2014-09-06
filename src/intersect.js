Array.prototype.intersect = function (arr, comparer) {
	comparer = comparer || EqualityComparer;
	return this.distinct(comparer).where(function (t) {
		return arr.contains(t, comparer);
	});
};