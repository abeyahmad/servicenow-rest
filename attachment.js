var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var qs = require('querystring');
var fs = require('fs');
var mime = require('mime');
var Attachment = (function() {
    'use strict';

    function Attachment(instance, user, password,apiversion) {
        // enforces new
        if (!(this instanceof Attachment)) {
            return new Attachment(instance, user, password);
        }
        this.instance = instance;
        this.apiversion = apiversion ? apiversion + '/' : '';
        this.params = {};
        this.reqobj = new req(instance, user, password,this.apiversion);
    }

    Attachment.prototype.get = function(sysid) {
        this.reqobj.url += '/' + sysid
        return request.getAsync(this.reqobj).then(plogic)
    };
    Attachment.prototype.query = function() {
        this.reqobj.qs = this.params;
        return request.getAsync(this.reqobj).then(plogic)

    };
    Attachment.prototype.delete = function(sysid) {
        this.reqobj.url += '/' + sysid;
        return request.delAsync(this.reqobj).then(dlogic);
    }
    Attachment.prototype.getFileCallback = function(sysid, dir, callback) {
        this.reqobj.url += '/' + sysid + '/file';
        this.reqobj.encoding = null;
        var that = this;
        var file_name = '';
        var callback = callback;
        request(that.reqobj)
            .on('response', function(response) {
                var file_name = dir + JSON.parse(response.headers['x-attachment-metadata']).file_name;
                response.pipe(fs.createWriteStream(file_name))
                    .on('error', function(error) {
                        callback(error);
                    })
                    .on('close', function(value) {
                        callback(null, file_name);
                    })
            })
    };
    Attachment.prototype.getAttachment = function(sysid, dir) {
        if (!dir) var dir = ''
        this.reqobj.url += '/' + sysid + '/file';
        this.reqobj.encoding = null;
        var that = this;
        var file_name = '';
        var file = new Promise(function(resolve, reject) {


            request(that.reqobj)
                .on('response', function(response) {
                    var file_name = dir + JSON.parse(response.headers['x-attachment-metadata']).file_name;
                    response.pipe(fs.createWriteStream(file_name))
                        .on('error', function(error) {
                            reject('Connection Error');
                        })
                        .on('close', function(value) {
                            resolve(file_name);
                        })
                })
        })
        return file;
    };
    Attachment.prototype.getAttachments = function(tablename, sysid, dir) {
        this.setLimit(10);
        var that = this;
        var dir = dir;
        var files = new Promise(function(resolve, reject) {
            that.query().then(function(value) {
                var arr1 = [];
                var file_names = []
                value.forEach(function(obj) {
                    that.reset();
                    that.addEncodedQuery('table_name=' + tablename + '^table_sys_id=' + sysid);
                    arr1.push(that.getAttachment(obj.sys_id, dir).then(function(value) {
                        file_names.push(value);
                    }));
                });
                Promise.all(arr1).then(function() {
                    resolve(file_names)
                })
            });
        })
        return files;

    };
    Attachment.prototype.attachFile = function(tablename, sysid, file_name, dir) {
        if (dir) {
            var filelocation = dir + file_name;
        } else {
            var filelocation = file_name;
        }
        var reqobj = this.reqobj;
        reqobj.headers['Content-Type'] = mime.lookup(filelocation);
        reqobj.url += '/file'
        reqobj.qs = {
            'file_name': file_name,
            'table_name': tablename,
            'table_sys_id': sysid
        }
        var attachment = new Promise(function(resolve, reject) {
            fs.createReadStream(filelocation)
                .pipe(request
                    .post(reqobj, function(err, response) {
                        if (err) {
                            reject(err)
                        } else if (response.statusCode == 404 || response.statusCode == 401) {
                            reject('Record not found or authentication error');
                        }
                        resolve(response.body.result)
                    })
                )
        });
        return attachment
    };

    Attachment.prototype.addEncodedQuery = function(value) {
        this.params.sysparm_query = value;
    };
    Attachment.prototype.setLimit = function(value) {
        this.params.sysparm_limit = value;
    };
    Attachment.prototype.reset = function(value) {
        this.reqobj = new req(this.instance, this.reqobj.auth.user, this.reqobj.auth.pass,this.apiversion);
    }

    return Attachment;

    function req(instance, user, password,apiversion) {

        this.url = 'https://' + instance + '.service-now.com/api/now/' + apiversion + '/attachment',
            this.headers = {
                'Accept': 'application/json'
            };
        this.json = true;
        this.auth = {
            user: user,
            pass: password
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
            return Promise.reject("Delete failed " + statuscode);
        }
        return Promise.resolve("Delete success");
    }
}());
module.exports = Attachment
