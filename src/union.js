Array.prototype.union = function (arr) {
	return this.concat(arr).distinct();
};