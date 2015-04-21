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