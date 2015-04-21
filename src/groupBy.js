(function () {
	'use strict';

	Array.prototype.groupBy = function (selector, comparer) {
		var grp = [];
		var l = this.length;
		comparer = comparer || linq.EqualityComparer;
		selector = selector || linq.Selector;

		for (var i = 0; i < l; i++) {
			var k = selector(this[i]);
			var g = grp.first(function (u) {
				return comparer(u.key, k);
			});

			if (!g) {
				g = [];
				g.key = k;
				grp.push(g);
			}

			g.push(this[i]);
		}
		return grp;
	};

}());
