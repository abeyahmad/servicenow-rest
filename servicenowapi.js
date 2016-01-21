var request = require('request');
var Promise = require('bluebird');
var qs = require('querystring');
var ServiceNow = function(instance, user, password) {
    

    this.url = 'https://' + instance + '.service-now.com/api/now/v1/table/'
    this.importurl = 'https://' + instance + '.service-now.com/api/now/import/'
    this.aggurl = 'https://' + instance + '.service-now.com/api/now/v1/stats/'
    this.auth = {
        user: user,
        password: password
    };
    this.getdefaults = {
        sysparm_query: '',
        sysparm_display_value: '',
        sysparm_fields: 'name,script',
        sysparm_limit: '10',
        sysparm_view: '',
        sysparm_exclude_reference_link: false
    }

}
ServiceNow.prototype.query = function(tablename, query) {
    var reqoptions = {
        url: this.url + tablename,
        method: 'get',
        qs: {
            sysparm_query: query
        },
        auth: this.auth,
        json: true
    }
    var returnRecords = new Promise(function(resolve, reject) {
        request(reqoptions, function(err, response, body) {
            if (err) throw (err);
            if (response.statusCode == 401 || response.statusCode == 404)
                throw response.body.error.message + ': ' + response.body.error.detail
            console.log(body)
            console.log(response.statusCode)
            resolve(body.result);
        })
    })
    return returnRecords;

}

ServiceNow.prototype.get = function(tablename, sysid) {
    var reqoptions = {
        url: this.url + tablename + '/' + sysid,
        method: 'get',
        auth: this.auth,
        json: true
    }
    var returnRecord = new Promise(function(resolve, reject) {
        request(reqoptions, function(err, response, body) {
            if (err) reject(err);
            if (response.statusCode == 401 || response.statusCode == 404)
                throw response.body.error.message + ': ' + response.body.error.detail
            resolve(body.result);
        })
    })
    return returnRecord;

}

ServiceNow.prototype.insert = function(tablename, obj) {
    var reqoptions = {
        url: this.url + tablename,
        body: obj,
        method: 'post',
        auth: this.auth,
        json: true,

    };
    var returnRecord = new Promise(function(resolve, reject) {
        request(reqoptions, function(err, response, body) {
            if (err) throw (err);
            console.log(response.statusCode)
            if (response.statusCode == 401 || response.statusCode == 404)
                throw response.body.error.message + ': ' + response.body.error.detail
            resolve(body.result.sys_id);
        })
    })
    return returnRecord;
}

ServiceNow.prototype.update = function(tablename, sysid, obj) {
    var reqoptions = {
        url: this.url + tablename + '/' + sysid,
        method: 'PATCH',
        body: obj,
        auth: this.auth,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    var returnRecord = new Promise(function(resolve, reject) {
        request(reqoptions, function(err, response, body) {
            console.log(response.statusCode)
            if (err) throw (err);
            resolve(body.result);
        })
    })
    return returnRecord;
}

ServiceNow.prototype.delete = function(tablename, sysid) {
    var reqoptions = {
        url: this.url + tablename + '/' + sysid,
        method: 'delete',
        auth: this.auth,
        json: true
    }
    var returnRecord = new Promise(function(resolve, reject) {
        request(reqoptions, function(err, response, body) {
            if (err) throw (err);
            if (response.statusCode == 401 || response.statusCode == 404)
                throw response.body.error.message + ': ' + response.body.error.detail
            resolve("Record deleted");
        })
    })
    return returnRecord;
}

ServiceNow.prototype.import = function(tablename, obj) {
    var reqoptions = {
        url: this.importurl + tablename,
        method: 'POST',
        auth: this.auth,
        json: true,
        body: obj,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    var returnRecord = new Promise(function(resolve, reject) {
        request(reqoptions, function(err, response, body) {
            if (err) throw (err);
            if (response.statusCode == 401 || response.statusCode == 404)
                throw response.body.error.message + ': ' + response.body.error.detail
            resolve(response.body);
        })
    });
    return returnRecord;
}
ServiceNow.prototype.getImportRow = function(tablename, sysid) {
    var reqoptions = {
        url: this.importurl + tablename + '/'+sysid,
        auth: this.auth,
        json: true,
        headers: {
            'Accept': 'application/json'
        }
    }
    var returnRecord = new Promise(function(resolve, reject) {
        request(reqoptions, function(err, response, body) {
            if (err) throw (err);
            if (response.statusCode == 401 || response.statusCode == 404)
                throw response.body.error.message + ': ' + response.body.error.detail
            resolve(response.body);
        })
    });
    return returnRecord;
}
ServiceNow.prototype.getAggregate = function(tablename, query) {
    var reqoptions = {
        url: this.aggurl + tablename + '/',
        auth: this.auth,
        json: true,
        qs: {
        	sysparm_query : query
        },
        headers: {
            'Accept': 'application/json'
        }
    }
    var returnRecord = new Promise(function(resolve, reject) {
        request(reqoptions, function(err, response, body) {
            if (err) throw (err);
            if (response.statusCode == 401 || response.statusCode == 404)
                throw response.body.error.message + ': ' + response.body.error.detail
            resolve(response.body);
        })
    });
    return returnRecord;
}
module.exports = ServiceNow;