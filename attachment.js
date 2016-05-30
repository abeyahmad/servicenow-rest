var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var fs = require('fs');
var mime = require('mime');
var Attachment = function(instance, user, password, apiversion) {
    this.apiversion = apiversion ? apiversion + '/' : '';
    this.baseurl = 'https://' + instance + '.service-now.com/api/now/' + this.apiversion + '/attachment';
    this.instance = instance;
    this.user = user;
    this.pass = password;
    this.params = {};
}
Attachment.prototype = {
    query: function() {
        return request.getAsync(this.reqobj).then(this.plogic)
    },
    get: function(sysid) {
        this.url = this.baseurl + '/' + sysid
        return request.getAsync(this.reqobj).then(this.plogic)
    },
    delete: function(sysid) {
        this.reqobj.url += '/' + sysid;
        return request.delAsync(this.reqobj).then(this.dlogic);
    },
    attachFile: function(tablename, sysid, file_name, dir) {
        var filelocation = dir ? dir + file_name : file_name;
        var reqobj = this.reqobj;

        reqobj.headers['Content-Type'] = mime.lookup(filelocation);
        reqobj.url += '/file';
        reqobj.method = 'POST';
        reqobj.qs = {
            'file_name': file_name,
            'table_name': tablename,
            'table_sys_id': sysid
        }

        var res = {};
        return new Promise(function(resolve, reject) {
            fs.createReadStream(filelocation).pipe(request(reqobj))
                .on('response',function(response) {
                  res = response;
                })
                .on('error', function(value) {
                    reject(value)
                })
                .on('close', function(value) {
                  console.log(res);
                  resolve(res);
                })
        })
    },
    getAttachments: function(table, sysid, dir) {
        var self = this;
        return this.getAttachmentRecords(table, sysid).then(getFiles);

        function getFiles(rec) {
            var allfiles = [];
            var filepromises = rec.map(filerequests);
            return Promise.all(filepromises);
        }

        function filerequests(rec) {
            var filename = rec.name;
            var sys_id = rec.sys_id;
            return self.getAttachment(sys_id, filename);
        }

    },
    getAttachmentRecords: function(tablename, sysid) {
        this.url = this.baseurl;
        this.addEncodedQuery('table_name=' + tablename + '^table_sys_id=' + sysid);
        return this.query().then(function(value) {
            var arr1 = [];
            // console.log(value);
            value.forEach(function(rec) {
                arr1.push(rec);
            });
            return arr1;
        })
    },
    getAttachment: function(sysid, dir) {
        if (!dir) var dir = ''
        this.url = this.baseurl + '/' + sysid + '/file';
        console.log(this.url)
        this.reqobj.encoding = null;
        var that = this;
        var file_name = '';
        // console.log(this.reqobj)
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
    },
    addEncodedQuery: function(value) {
        this.params.sysparm_query = value;
    },
    setLimit: function(value) {
        this.params.sysparm_limit = value;
    },
    get reqobj() {
        return {
            url: this.url || this.baseurl,
            headers: {
                'Accept': 'application/json'
            },
            auth: {
                user: this.user,
                pass: this.pass
            },
            json: true,
            qs: this.params
        }
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
            return Promise.reject("Delete failed " + statuscode);
        }
        return Promise.resolve("Delete success");
    }
}
module.exports = Attachment;
