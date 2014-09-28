Array.prototype.forEach = Array.prototype.forEach || function (callback, context) {
	var window = window || {};
	context = context || window;
	var l = this.length;
	for (var i = 0; i < l; i++)
		callback.call(context, this[i], i, this);
};