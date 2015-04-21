var linq = {
	EqualityComparer: function (a, b) {
		return a === b || a.valueOf() === b.valueOf();
	},
	SortComparer: function (a, b) {
		if (a === b) return 0;
		if (a === null) return -1;
		if (b === null) return 1;
		if (typeof a == 'string') return a.toString().localeCompare(b.toString());
		return a.valueOf() - b.valueOf();
	},
	Predicate: function () {
		return true;
	},
	Selector: function (t) {
		return t;
	}
};