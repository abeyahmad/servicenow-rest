var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var qs = require('querystring');

var GlideAggregate = (function() {
    'use strict';

    function GlideAggregate(instance, tablename, user, password) {
        // enforces new
        if (!(this instanceof GlideAggregate)) {
            return new GlideAggregate(instance, tablename, user, password);
        }
        this.params = {};
        this.reqobj = new req(instance, tablename, user, password)
    }

    GlideAggregate.prototype.query = function() {
        this.reqobj.qs = this.params;
        return request.getAsync(this.reqobj).then(plogic);
    }
    GlideAggregate.prototype.addEncodedQuery = function(value) {
        this.params.sysparm_query = value;
    };
    //available options SUM,MIN,MAX,AVG
    GlideAggregate.prototype.addAggregate = function(agg, fields) {
        var val = agg.toLowerCase();
        console.log(val)
        if (val != 'sum' && val != 'min' && val != 'max' && val != 'avg')
            throw "Invalid Aggregate"
        var parmname = 'sysparm_' + val + '_fields';
        this.params[parmname] = fields;
    }
    GlideAggregate.prototype.groupBy = function(value) {
        this.params.sysparm_group_by = value;
    };
    GlideAggregate.prototype.addHaving = function(agg, field, operator, value) {
        var arr1 = [agg, field, operator, value];
        this.params.sysparm_having = arr1.join('^');
    };
    GlideAggregate.prototype.addCount = function(bool) {
        this.params.sysparm_count = bool;
    };
    GlideAggregate.prototype.orderByDescending = function() {
        this.params.sysparm_order_by = false;
    };
    GlideAggregate.prototype.displayValue = function(value) {
        this.params.sysparm_display_value = value
    };
    return GlideAggregate;

    function req(instance, tablename, user, password) {

        this.url = 'https://' + instance + '.service-now.com/api/now/v1/stats/' + tablename,
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
}());
module.exports = GlideAggregate;