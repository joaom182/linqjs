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
(function () {
	'use strict';

	Array.prototype.selectMany = function (selector, resSelector) {
		resSelector = resSelector || function (i, res) {
			return res;
		};
		return this.aggregate(function (a, b) {
			return a.concat(selector(b).select(function (res) {
				return resSelector(b, res);
			}));
		}, []);
	};

}());
(function () {
	'use strict';

	Array.prototype.take = function (c) {
		return this.slice(0, c);
	};

}());
(function () {
	'use strict';

	Array.prototype.skip = Array.prototype.slice;

}());
(function () {
	'use strict';

	Array.prototype.first = function (predicate, def) {
		var l = this.length;
		if (!predicate) return l ? this[0] : def == null ? null : def;
		for (var i = 0; i < l; i++) {
			if (predicate(this[i], i, this))
				return this[i];
		}

		return def == null ? null : def;
	};

}());

(function () {
	'use strict';

	Array.prototype.last = function (predicate, def) {
		var l = this.length;
		if (!predicate) return l ? this[l - 1] : def == null ? null : def;
		while (l-- > 0) {
			if (predicate(this[l], l, this))
				return this[l];
		}

		return def == null ? null : def;
	};

}());
(function () {
	'use strict';

	Array.prototype.union = function (arr) {
		return this.concat(arr).distinct();
	};

}());
(function () {
	'use strict';

	Array.prototype.intersect = function (arr, comparer) {
		comparer = comparer || linq.EqualityComparer;
		return this.distinct(comparer).where(function (t) {
			return arr.contains(t, comparer);
		});
	};

}());
(function () {
	'use strict';

	Array.prototype.except = function (arr, comparer) {
		if (!(arr instanceof Array)) arr = [arr];
		comparer = comparer || linq.EqualityComparer;
		var l = this.length;
		var res = [];
		for (var i = 0; i < l; i++) {
			var k = arr.length;
			var t = false;
			while (k-- > 0) {
				if (comparer(this[i], arr[k]) === true) {
					t = true;
					break;
				}
			}
			if (!t) res.push(this[i]);
		}
		return res;
	};

}());
(function () {
	'use strict';

	Array.prototype.distinct = function (comparer) {
		var arr = [];
		var l = this.length;
		for (var i = 0; i < l; i++) {
			if (!arr.contains(this[i], comparer))
				arr.push(this[i]);
		}
		return arr;
	};

}());
(function () {
	'use strict';

	Array.prototype.zip = function (arr, selector) {
		return this
			.take(Math.min(this.length, arr.length))
			.select(function (t, i) {
				return selector(t, arr[i]);
			});
	};

}());

(function () {
	'use strict';

	Array.prototype.indexOf = Array.prototype.indexOf || function (o, index) {
		var l = this.length;
		for (var i = Math.max(Math.min(index, l), 0) || 0; i < l; i++)
			if (this[i] === o) return i;
		return -1;
	};

}());
(function () {
	'use strict';

	Array.prototype.lastIndexOf = Array.prototype.lastIndexOf || function (o, index) {
		var l = Math.max(Math.min(index || this.length, this.length), 0);
		while (l-- > 0)
			if (this[l] === o) return l;
		return -1;
	};

}());
(function () {
	'use strict';

	Array.prototype.remove = function (item) {
		var i = this.indexOf(item);
		if (i != -1)
			this.splice(i, 1);
	};

}());
(function () {
	'use strict';

	Array.prototype.removeAll = function (predicate) {
		var item;
		var i = 0;
		while ((item = this.first(predicate)) != null) {
			i++;
			this.remove(item);
		}

		return i;
	};

}());
(function () {
	'use strict';

	Array.prototype.orderBy = function (selector, comparer) {
		comparer = comparer || linq.SortComparer;
		var arr = this.slice(0);
		var fn = function (a, b) {
			return comparer(selector(a), selector(b));
		};

		arr.thenBy = function (selector, comparer) {
			comparer = comparer || linq.SortComparer;
			return arr.orderBy(linq.Selector, function (a, b) {
				var res = fn(a, b);
				return res === 0 ? comparer(selector(a), selector(b)) : res;
			});
		};

		arr.thenByDescending = function (selector, comparer) {
			comparer = comparer || linq.SortComparer;
			return arr.orderBy(linq.Selector, function (a, b) {
				var res = fn(a, b);
				return res === 0 ? -comparer(selector(a), selector(b)) : res;
			});
		};

		return arr.sort(fn);
	};

}());
(function () {
	'use strict';

	Array.prototype.orderByDescending = function (selector, comparer) {
		comparer = comparer || linq.SortComparer;
		return this.orderBy(linq.Selector, function (a, b) {
			return -comparer(a, b);
		});
	};

}());
(function () {
	'use strict';

	Array.prototype.innerJoin = function (arr, outer, inner, result, comparer) {
		comparer = comparer || linq.EqualityComparer;
		var res = [];

		this.forEach(function (t) {
			arr.where(function (u) {
					return comparer(outer(t), inner(u));
				})
				.forEach(function (u) {
					res.push(result(t, u));
				});
		});

		return res;
	};

}());
(function () {
	'use strict';

	Array.prototype.groupJoin = function (arr, outer, inner, result, comparer) {
		comparer = comparer || linq.EqualityComparer;
		return this
			.select(function (t) {
				var key = outer(t);
				return {
					outer: t,
					inner: arr.where(function (u) {
						return comparer(key, inner(u));
					}),
					key: key
				};
			})
			.select(function (t) {
				t.inner.key = t.key;
				return result(t.outer, t.inner);
			});
	};

}());
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

(function () {
	'use strict';

	Array.prototype.toDictionary = function (keySelector, valueSelector) {
		var o = {};
		var l = this.length;
		while (l-- > 0) {
			var key = keySelector(this[l]);
			if (key == null || key === '') continue;
			o[key] = valueSelector(this[l]);
		}
		return o;
	};

}());
(function () {
	'use strict';

	Array.prototype.aggregate = Array.prototype.reduce || function (func, seed) {
		var arr = this.slice(0);
		var l = this.length;
		if (seed == null) seed = arr.shift();

		for (var i = 0; i < l; i++)
			seed = func(seed, arr[i], i, this);

		return seed;
	};

}());
(function () {
	'use strict';

	Array.prototype.min = function (s) {
		s = s || linq.Selector;
		var l = this.length;
		var min = s(this[0]);
		while (l-- > 0)
			if (s(this[l]) < min) min = s(this[l]);
		return min;
	};

}());
(function () {
	'use strict';

	Array.prototype.max = function (s) {
		s = s || linq.Selector;
		var l = this.length;
		var max = s(this[0]);
		while (l-- > 0)
			if (s(this[l]) > max) max = s(this[l]);
		return max;
	};

}());
(function () {
	'use strict';

	Array.prototype.sum = function (s) {
		s = s || linq.Selector;
		var l = this.length;
		var sum = 0;
		while (l-- > 0) sum += s(this[l]);
		return sum;
	};

}());
(function () {
	'use strict';

	var global = global;
	var window = window || global;

	Array.prototype.where = Array.prototype.filter || function (predicate, context) {
		context = context || window;
		var arr = [];
		var l = this.length;
		for (var i = 0; i < l; i++)
			if (Predicate.call(context, this[i], i, this) === true) arr.push(this[i]);
		return arr;
	};

}());
(function () {
	'use strict';

	var global = global;
	var window = window || global;

	Array.prototype.any = function (predicate, context) {
		context = context || window;
		predicate = predicate || linq.Predicate;
		var f = this.some || function (p, c) {
			var l = this.length;
			if (!p) return l > 0;
			while (l-- > 0)
				if (p.call(c, this[l], l, this) === true) return true;
			return false;
		};
		return f.apply(this, [predicate, context]);
	};

}());
(function () {
	'use strict';

	var global = global;
	var window = window || global;

	Array.prototype.all = function (predicate, context) {
		context = context || window;
		predicate = predicate || linq.Predicate;
		var f = this.every || function (p, c) {
			return this.length == this.where(p, c).length;
		};
		return f.apply(this, [predicate, context]);
	};

}());

(function () {
	'use strict';

	Array.prototype.takeWhile = function (predicate) {
		predicate = predicate || linq.Predicate;
		var l = this.length;
		var arr = [];
		for (var i = 0; i < l && predicate(this[i], i) === true; i++)
			arr.push(this[i]);

		return arr;
	};

}());
(function () {
	'use strict';

	Array.prototype.skipWhile = function (predicate) {
		predicate = predicate || linq.Predicate;
		var l = this.length;
		var i = 0;
		for (i = 0; i < l; i++)
			if (predicate(this[i], i) === false) break;

		return this.skip(i);
	};

}());
(function () {
	'use strict';

	Array.prototype.contains = function (o, comparer) {
		comparer = comparer || linq.EqualityComparer;
		var l = this.length;
		while (l-- > 0)
			if (comparer(this[l], o) === true) return true;
		return false;
	};

}());
(function () {
	'use strict';

	var global = global;
	var window = window || global;

	Array.prototype.forEach = Array.prototype.forEach || function (callback, context) {
		context = context || window;
		var l = this.length;
		for (var i = 0; i < l; i++)
			callback.call(context, this[i], i, this);
	};

}());
(function () {
	'use strict';

	Array.prototype.defaultIfEmpty = function (val) {
		return this.length === 0 ? [val === null ? null : val] : this;
	};

}());
(function () {
	'use strict';

	Array.range = function (start, count) {
		var arr = [];
		while (count-- > 0) {
			arr.push(start++);
		}
		return arr;
	};

}());