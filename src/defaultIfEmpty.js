(function () {
	'use strict';

	Array.prototype.defaultIfEmpty = function (val) {
		return this.length === 0 ? [val === null ? null : val] : this;
	};

}());