var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var qs = require('querystring');

var attachment = (function() {
	'use strict';

	function attachment(args) {
		// enforces new
		if (!(this instanceof attachment)) {
			return new attachment(args);
		}
		// constructor body
	}

	attachment.prototype.methodName = function(args) {
		// method body
	};

	return attachment;
}());