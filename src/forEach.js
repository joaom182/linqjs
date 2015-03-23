Array.prototype.forEach = Array.prototype.forEach || function (callback, context) {
	context = context || global || window;
	var l = this.length;
	for (var i = 0; i < l; i++)
		callback.call(context, this[i], i, this);
};