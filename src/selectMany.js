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