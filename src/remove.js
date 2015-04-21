(function () {
	'use strict';

	Array.prototype.remove = function (item) {
		var i = this.indexOf(item);
		if (i != -1)
			this.splice(i, 1);
	};

}());