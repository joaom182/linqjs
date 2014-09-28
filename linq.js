function EqualityComparer(a, b) {
    return a === b || a.valueOf() === b.valueOf();
}

function SortComparer(a, b) {
    if (a === b) return 0;
    if (a == null) return -1;
    if (b == null) return 1;
    if (typeof a == 'string') return a.toString().localeCompare(b.toString());
    return a.valueOf() - b.valueOf();
}

function Predicate() {
    return true;
}

function Selector(t) {
    return t;
}
Array.prototype.select = Array.prototype.map || function (selector, context) {
	window = window || {};
	context = context || window;
	var arr = [];
	var l = this.length;
	for (var i = 0; i < l; i++)
		arr.push(selector.call(context, this[i], i, this));
	return arr;
};
Array.prototype.selectMany = function (selector, resSelector) {
	resSelector = resSelector || function (i, res) { return res; };
	return this.aggregate(function (a, b) {
		return a.concat(selector(b).select(function (res) { return resSelector(b, res); }));
	}, []);
};
Array.prototype.take = function (c) {
	return this.slice(0, c);
};
Array.prototype.skip = Array.prototype.slice;
Array.prototype.first = function (predicate, def) {
	var l = this.length;
	if (!predicate) return l ? this[0] : def == null ? null : def;
	for (var i = 0; i < l; i++){
		if (predicate(this[i], i, this))
			return this[i];
	}

	return def == null ? null : def;
};
Array.prototype.last = function (predicate, def) {
	var l = this.length;
	if (!predicate) return l ? this[l - 1] : def == null ? null : def;
	while (l-- > 0){
		if (predicate(this[l], l, this))
			return this[l];
	}

	return def == null ? null : def;
};
Array.prototype.union = function (arr) {
	return this.concat(arr).distinct();
};
Array.prototype.intersect = function (arr, comparer) {
	comparer = comparer || EqualityComparer;
	return this.distinct(comparer).where(function (t) {
		return arr.contains(t, comparer);
	});
};
Array.prototype.except = function (arr, comparer) {
    if (!(arr instanceof Array)) arr = [arr];
    comparer = comparer || EqualityComparer;
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
Array.prototype.distinct = function (comparer) {
	var arr = [];
	var l = this.length;
	for (var i = 0; i < l; i++) {
		if (!arr.contains(this[i], comparer))
			arr.push(this[i]);
	}
	return arr;
};
Array.prototype.zip = function (arr, selector) {
	return this
	.take(Math.min(this.length, arr.length))
	.select(function (t, i) {
		return selector(t, arr[i]);
	});
};
Array.prototype.indexOf = Array.prototype.indexOf || function (o, index) {
	var l = this.length;
	for (var i = Math.max(Math.min(index, l), 0) || 0; i < l; i++)
		if (this[i] === o) return i;
	return -1;
};
Array.prototype.lastIndexOf = Array.prototype.lastIndexOf || function (o, index) {
	var l = Math.max(Math.min(index || this.length, this.length), 0);
	while (l-- > 0)
		if (this[l] === o) return l;
	return -1;
};
Array.prototype.remove = function (item) {
	var i = this.indexOf(item);
	if (i != -1)
		this.splice(i, 1);
};
Array.prototype.removeAll = function (predicate) {
	var item;
	var i = 0;
	while ((item = this.first(predicate)) != null) {
		i++;
		this.remove(item);
	}

	return i;
};
Array.prototype.orderBy = function (selector, comparer) {
    comparer = comparer || SortComparer;
    var arr = this.slice(0);
    var fn = function (a, b) {
        return comparer(selector(a), selector(b));
    };

    arr.thenBy = function (selector, comparer) {
        comparer = comparer || SortComparer;
        return arr.orderBy(Selector, function (a, b) {
            var res = fn(a, b);
            return res === 0 ? comparer(selector(a), selector(b)) : res;
        });
    };

    arr.thenByDescending = function (selector, comparer) {
        comparer = comparer || SortComparer;
        return arr.orderBy(Selector, function (a, b) {
            var res = fn(a, b);
            return res === 0 ? -comparer(selector(a), selector(b)) : res;
        });
    };

    return arr.sort(fn);
};
Array.prototype.orderByDescending = function (selector, comparer) {
	comparer = comparer || SortComparer;
	return this.orderBy(selector, function (a, b) { return -comparer(a, b); });
};
Array.prototype.innerJoin = function (arr, outer, inner, result, comparer) {
    comparer = comparer || EqualityComparer;
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
Array.prototype.groupJoin = function (arr, outer, inner, result, comparer) {
    comparer = comparer || EqualityComparer;
    return this
    .select(function (t) {
        var key = outer(t);
        return {
            outer: t,
            inner: arr.where(function (u) { return comparer(key, inner(u)); }),
            key: key
        };
    })
    .select(function (t) {
        t.inner.key = t.key;
        return result(t.outer, t.inner);
    });
};
Array.prototype.groupBy = function (selector, comparer) {
    var grp = [];
    var l = this.length;
    comparer = comparer || EqualityComparer;
    selector = selector || Selector;

    for (var i = 0; i < l; i++) {
        var k = selector(this[i]);
        var g = grp.first(function (u) { return comparer(u.key, k); });

        if (!g) {
            g = [];
            g.key = k;
            grp.push(g);
        }

        g.push(this[i]);
    }
    return grp;
};
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
Array.prototype.aggregate = Array.prototype.reduce || function (func, seed) {
	var arr = this.slice(0);
	var l = this.length;
	if (seed == null) seed = arr.shift();

	for (var i = 0; i < l; i++)
		seed = func(seed, arr[i], i, this);

	return seed;
};
Array.prototype.min = function (s) {
	s = s || Selector;
	var l = this.length;
	var min = s(this[0]);
	while (l-- > 0)
		if (s(this[l]) < min) min = s(this[l]);
	return min;
};
Array.prototype.max = function (s) {
	s = s || Selector;
	var l = this.length;
	var max = s(this[0]);
	while (l-- > 0)
		if (s(this[l]) > max) max = s(this[l]);
	return max;
};
Array.prototype.sum = function (s) {
	s = s || Selector;
	var l = this.length;
	var sum = 0;
	while (l-- > 0) sum += s(this[l]);
	return sum;
};
Array.prototype.where = Array.prototype.filter || function (predicate, context) {
	window = window || {};
	context = context || window;
	var arr = [];
	var l = this.length;
	for (var i = 0; i < l; i++)
		if (predicate.call(context, this[i], i, this) === true) arr.push(this[i]);
	return arr;
};
Array.prototype.any = function (predicate, context) {
	window = window || {};
    context = context || window;
    var f = this.some || function (p, c) {
        var l = this.length;
        if (!p) return l > 0;
        while (l-- > 0)
            if (p.call(c, this[l], l, this) === true) return true;
        return false;
    };
    return f.apply(this, [predicate, context]);
};
Array.prototype.all = function (predicate, context) {
	window = window || {};
	context = context || window;
	predicate = predicate || Predicate;
	var f = this.every || function (p, c) {
		return this.length == this.where(p, c).length;
	};
	return f.apply(this, [predicate, context]);
};
Array.prototype.takeWhile = function (predicate) {
	predicate = predicate || Predicate;
	var l = this.length;
	var arr = [];
	for (var i = 0; i < l && predicate(this[i], i) === true ; i++)
		arr.push(this[i]);

	return arr;
};
Array.prototype.skipWhile = function (predicate) {
	predicate = predicate || Predicate;
	var l = this.length;
	var i = 0;
	for (i = 0; i < l; i++)
		if (predicate(this[i], i) === false) break;

	return this.skip(i);
};
Array.prototype.contains = function (o, comparer) {
	comparer = comparer || EqualityComparer;
	var l = this.length;
	while (l-- > 0)
		if (comparer(this[l], o) === true) return true;
	return false;
};
Array.prototype.forEach = Array.prototype.forEach || function (callback, context) {
	window = window || {};
	context = context || window;
	var l = this.length;
	for (var i = 0; i < l; i++)
		callback.call(context, this[i], i, this);
};
Array.prototype.defaultIfEmpty = function (val) {
	return this.length == 0 ? [val == null ? null : val] : this;
};
Array.range = function (start, count) {
	var arr = [];
	while (count-- > 0) {
		arr.push(start++);
	}
	return arr;
};