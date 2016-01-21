var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var qs = require('querystring');

var GlideRecord = (function() {
	'use strict';

	function GlideRecord(instance,tablename,user,password) {
		// enforces new
		if (!(this instanceof GlideRecord)) {
			return new GlideRecord(tablename);
		}
		this.params = {};
		this.tablename = tablename;
		this.reqobj = {
			url:'https://' + instance + '.service-now.com/api/now/v1/table/',
			header: {
				'Accept':'application/json'
			},
			auth: {
				user:user,
				password: password
			}
		}
	}
	GlideRecord.prototype.get = function(sysid) {
		var reqobj = this.reqobj;
		reqobj.url = reqobj.url+this.tablename+'/'+sysid;
		return request.getAsync(reqobj);
	};
	GlideRecord.prototype.query = function() {
		var reqobj = this.reqobj;
		reqobj.url = reqobj.url+this.tablename+'/';
		reqobj.qs = thisparams;
		return request.getAsync(reqobj);
	};
	GlideRecord.prototype.insert = function(obj) {
		var reqobj = this.reqobj;
		reqobj.url = reqobj.url+this.tablename+'/'+sysid;
		reqobj.method = 'post';
		reqobj.json = true;
		reqobj.body = obj;
		return request.getAsync(reqobj);
	};
	GlideRecord.prototype.update = function(sysid,obj) {
		var reqobj = this.reqobj;
		reqobj.url = reqobj.url+this.tablename+'/'+sysid;
		reqobj.method = 'patch';
		reqobj.json = true;
		reqobj.body = obj;
		return request.getAsync(reqobj);
	};
	GlideRecord.prototype.delete = function(sysid) {
		var reqobj = this.reqobj;
		reqobj.url = reqobj.url+this.tablename+'/'+sysid;
		reqobj.method = 'delete';
	};
	GlideRecord.prototype.addEncodedQuery = function(query) {
		this.params.sysparm_query = query;
	};
	GlideRecord.prototype.setLimit = function(value) {
		this.params.sysparm_limit = value
	};
	GlideRecord.prototype.setReturnFields = function(value) {
		this.params.sysparm_fields = value;
	};
	GlideRecord.prototype.setDisplay = function(value) {
		this.params.sysparm_display_value = value;
	};
	GlideRecord.prototype.setView = function(value) {
		this.params.sysparm_view = value;
	};
	GlideRecord.prototype.setOffset = function(value) {
		this.params.sysparm_offset = value;
	};
	GlideRecord.prototype.setExcludeReference = function(value) {
		this.params.sysparm_exclude_reference_link
	};
	return GlideRecord;
}())

module.exports = GlideRecord;