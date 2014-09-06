Array.prototype.select = Array.prototype.map || function (selector, context) {
	context = context || window;
	var arr = [];
	var l = this.length;
	for (var i = 0; i < l; i++)
		arr.push(selector.call(context, this[i], i, this));
	return arr;
};