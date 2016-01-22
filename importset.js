var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var qs = require('querystring');

var ImportSet = (function() {
    'use strict';

    function ImportSet(instance, tablename, user, password) {
        // enforces new
        if (!(this instanceof ImportSet)) {
            return new ImportSet(instance, tablename, user, password);
        }
        this.reqobj = new req(instance, tablename, user, password);
    }
    ImportSet.prototype.get = function(sysid) {
    	this.reqobj.url += '/'+sysid;
        return request.getAsync(this.reqobj).then(plogic);
    };
    ImportSet.prototype.insert = function(obj) {
        this.reqobj.body = obj
        return request.postAsync(this.reqobj).then(plogic);
    };


    return ImportSet;

    function req(instance, tablename, user, password) {

        this.url = 'https://' + instance + '.service-now.com/api/now/v1/import/' + tablename,
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
        console.log(value.headers)
        return Promise.resolve(value.body.result);
    }
}());
module.exports = ImportSet