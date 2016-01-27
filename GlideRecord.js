var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var qs = require('querystring');

var GlideRecord = (function() {
    'use strict';

    function GlideRecord(instance, tablename, user, password) {
        // enforces new
        if (!(this instanceof GlideRecord)) {
            return new GlideRecord(tablename);
        }
        this.reqobj = new req(instance, tablename, user, password);
        this.params = {};
    }
    GlideRecord.prototype.get = function(sysid) {
        var reqobj = this.reqobj;
        reqobj.url = reqobj.url + '/' + sysid;
        return request.getAsync(reqobj).then(plogic);
    };
    GlideRecord.prototype.query = function() {
        this.reqobj.qs = this.params;
        return request.getAsync(this.reqobj).then(plogic);
    };
    GlideRecord.prototype.insert = function(obj) {
        var reqobj = this.reqobj;
        reqobj.body = obj;
        reqobj.qs = this.params;
        return request.postAsync(reqobj).then(plogic);
    };
    GlideRecord.prototype.update = function(sysid, obj) {
        var reqobj = this.reqobj;
        reqobj.url = reqobj.url + '/' + sysid;
        reqobj.body = obj;
        reqobj.qs = this.params;
        return request.patchAsync(reqobj).then(plogic);
    };
    GlideRecord.prototype.delete = function(sysid) {
        var reqobj = this.reqobj;
        reqobj.url = reqobj.url + '/' + sysid;
        return request.delAsync(reqobj).then(dlogic);
    };
    GlideRecord.prototype.addEncodedQuery = function(value) {
        this.params.sysparm_query = value;
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

    function req(instance, tablename, user, password) {

        this.url = 'https://' + instance + '.service-now.com/api/now/v1/table/' + tablename,
        this.header = {
            'Accept': 'application/json'
        };
        this.json = true;
        this.auth = {
            user: user,
            password: password
        }
    }

    function plogic(value) {
        var statuscode = value.statusCode;
        if (statuscode == 400 || statuscode == 404 || statuscode == 401) {
            return Promise.reject(value.body)
        }
        return Promise.resolve(value.body.result);
    }
    function dlogic(value) {
        var statuscode = value.statusCode;
        if (statuscode == 400 || statuscode == 404 || statuscode == 401) {
            return Promise.reject("Delete failed")
        }
        return Promise.resolve("Delete success");
    }


}())




module.exports = GlideRecord;
