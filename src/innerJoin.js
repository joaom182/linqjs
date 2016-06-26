(function () {
	'use strict';
	
	Array.prototype.innerJoin = function (inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
		if (!inner) { throw new TypeError("inner is undefined."); }
		if (!innerKeySelector) { throw new TypeError("innerKeySelector is undefined."); }
		if (!outerKeySelector) { throw new TypeError("outerKeySelector is undefined."); }
		
		resultSelector = resultSelector || function (o, i) { 
			return [o, i];
		};
		comparer = comparer || linq.EqualityComparer;
		var innerKeyed = inner.select(function (e) { 
			return {
				key: innerKeySelector(e),
				element: e
			};
		});
		return this.selectMany(function (o) { 
			var key = outerKeySelector(o);
			return innerKeyed.where(function (i) {
					return comparer(key, i.key);
				})
				.select(function (i) {
					return i.element;
				});
		}, resultSelector.bind(null));
	};

}());
