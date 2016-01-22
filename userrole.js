var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var qs = require('querystring');

var UserRole = (function() {
	'use strict';

	function UserRole(args) {
		// enforces new
		if (!(this instanceof UserRole)) {
			return new UserRole(args);
		}
		// constructor body
	}

	UserRole.prototype.methodName = function(args) {
		// method body
	};

	return UserRole;
}());