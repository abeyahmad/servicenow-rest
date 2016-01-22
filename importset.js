var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var qs = require('querystring');

var ImportSet = (function() {
	'use strict';

	function ImportSet(args) {
		// enforces new
		if (!(this instanceof ImportSet)) {
			return new ImportSet(args);
		}
		// constructor body
	}
	ImportSet.prototype.get = function(sysid) {
		// method body
	};
	ImportSet.prototype.insert = function(obj) {
		// method body
	};


	return ImportSet;
}());