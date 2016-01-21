function config() {
    this.auth = {
        user: 'abey',
        password: 'password'
    };
    this.header = {
    	'Accept': 'application/json'
    }
}
function post(obj) {
	config.apply(this);
	this.method = 'post';
	this.body = obj
	this.header['Content-Type'] = 'application/json';
}

var gg = post();
console.log(JSON.stringify(gg))



var GlideRecord = (function() {
	'use strict';

	function GlideRecord(args) {
		// enforces new
		if (!(this instanceof GlideRecord)) {
			return new GlideRecord(args);
		}
		// constructor body
	}

	GlideRecord.prototype.methodName = function(args) {
		// method body
	};

	return GlideRecord;
}());