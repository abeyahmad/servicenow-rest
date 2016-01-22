var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var qs = require('querystring');

var IdReconcile = (function() {
	'use strict';

	function IdReconcile(args) {
		// enforces new
		if (!(this instanceof IdReconcile)) {
			return new IdReconcile(args);
		}
		// constructor body
	}

	IdReconcile.prototype.methodName = function(args) {
		// method body
	};

	return IdReconcile;
}());