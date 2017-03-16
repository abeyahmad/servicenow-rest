var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
request.debug;
var qs = require('querystring');

var GlideRecord = function(instance, tablename, user, password, apiversion) {

    this.apiversion = apiversion ? apiversion + '/' : '';
    this.baseurl = 'https://' + instance + '.service-now.com/api/now/' + this.apiversion + 'table/' + tablename;
    this.user = user;
    this.pass = password;
    this.tablename = tablename;
    this.instance = instance;

    this.params = {};
};
GlideRecord.prototype = {
    get: function(sysid) {
        this.url = this.baseurl + '/' + sysid;
        return request.getAsync(this.reqobj).then(this.plogic);
    },
    query: function() {
        this.url = this.baseurl;
        return request.getAsync(this.reqobj).then(this.plogic);
    },
    insert: function(obj) {
        this.url = this.baseurl;
        console.log(this.url);
        this.body = obj;
        return request.postAsync(this.postobj).then(this.plogic);
    },
    update: function(sysid, obj) {
        this.url = this.baseurl + '/' + sysid;
        this.body = obj;
        return request.patchAsync(this.postobj).then(this.plogic);
    },
    delete: function(sysid) {
        this.url = this.baseurl + '/' + sysid;
        return request.delAsync(this.reqobj).then(this.dlogic);
    },
    clone: function(sysid, clonefields) {
        var self = this;
        this.setDisplay(true);
        this.params['sysparm_exclude_reference_link'] = true
        this.get(sysid).then(function(value) {
            var obj = this.cloneobj(value, clonefields);
            self.insert(obj).then(function(val) {
                console.log(val)
            })
        })
    },
    get reqobj() {
        var options = {
            url: this.url || this.baseurl,
            header: {
                'Accept': 'application/json'
            },
            auth: {
                user: this.user,
                pass: this.pass
            },
            json: true,
            qs: this.params
        }
        if(this.proxy) {
            options.proxy = this.proxy
        }
        return options;
    },
    get postobj() {
        return {
            url: this.url || this.baseurl,
            header: {
                'Accept': 'application/json'
            },
            auth: {
                user: this.user,
                pass: this.pass
            },
            json: true,
            qs: this.params,
            body: this.body
        }
    },

    cloneobj: function(obj, clonefields) {
        var obj = obj
        var obj1 = {};
        clonefields.forEach(function(field) {
            if (obj.hasOwnProperty(field)) {
                if (typeof obj[field] == 'object') {
                    obj1[field] = obj[field]['value']
                } else {
                    obj1[field] = obj[field]
                }
            }
        })
        return obj1
    },
    setProxy: function(url) {
        this.proxy = url;
    },
    plogic: function(value) {
        var statuscode = value.statusCode;
        if (statuscode == 400 || statuscode == 404 || statuscode == 401) {
            return Promise.reject(value.body)
        }
        return Promise.resolve(value.body.result);
    },

    dlogic: function(value) {
        var statuscode = value.statusCode;
        if (statuscode == 400 || statuscode == 404 || statuscode == 401) {
            return Promise.reject("Delete failed")
        }
        return Promise.resolve("Delete success");
    },
    addEncodedQuery: function(value) {
        this.params.sysparm_query = value;
    },
    setEncodedQuery: function(value) {
        this.params.sysparm_query = value;
    },
    setLimit: function(value) {
        this.params.sysparm_limit = value
    },
    setReturnFields: function(value) {
        this.params.sysparm_fields = value;
    },
    setDisplay: function(value) {
        this.params.sysparm_display_value = value;
    },
    setView: function(value) {
        this.params.sysparm_view = value;
    },
    setOffset: function(value) {
        this.params.sysparm_offset = value;
    },
    setExcludeReference: function(value) {
        this.params.sysparm_exclude_reference_link = value;
    },
    set limit(value) {
        this.params.sysparm_limit = value
    },
    set returnFields(value) {
        this.params.sysparm_fields = value;
    },
    set display(value) {
        this.params.sysparm_display_value = value;
    },
    set view(value) {
        this.params.sysparm_view = value;
    },
    set offset(value) {
        this.params.sysparm_offset = value;
    },
    set excludeReference(value) {
        this.params.sysparm_exclude_reference_link;
    },
    set encodedQuery(str) {
        this.params.sysparm_query = value;
    },
    get encodedQuery() {
        return this.params.sysparm_query;
    },
    get limit() {
        return this.params.sysparm_limit
    },
    get returnFields() {
        return this.params.sysparm_fields;
    },
    get display() {
        return this.params.sysparm_display_value;
    },
    get view() {
        return this.params.sysparm_view;
    },
    get offset() {
        return this.params.sysparm_offset;
    },
    get excludeReference() {
        return this.params.sysparm_exclude_reference_link;
    }

}
module.exports = GlideRecord;
