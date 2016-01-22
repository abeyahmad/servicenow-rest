var GlideRecord = require('./gliderecord.js')


var user = process.env.user,
    password = process.env.password,
    instance = process.env.instance;
obj = {'short_description':"hello there update"}
query()
insert(obj);
update('f8b2bc624f459600839b8c318110c7c9',obj)
deleteRecord('c472bc624f459600839b8c318110c7c8');
function query() {
    var gr = new GlideRecord(instance, 'incident', 'admin', password);
    gr.setLimit(2);
    gr.query().then(function(value) {
    	console.log(value)
    }, function(value) {
    })
}

function insert() {
    var gr = new GlideRecord(instance, 'incident', 'admin', password),
    obj = {'short_description':"hello there"}
    gr.setReturnFields('number,sys_id')
    gr.insert(obj).then(function(value) {
    	console.log(value);
    }, function(value) {
    });
}
function update(sysid,obj) {
    var gr = new GlideRecord(instance, 'incident', 'admin', password);
    gr.setReturnFields('number,sys_id')
    gr.update(sysid,obj).then(function(value) {
    	console.log(value);
    }, function(value) {
    	console.log(value);
    });
}
function deleteRecord(sysid) {
    var gr = new GlideRecord(instance, 'incident', 'admin', password)
    gr.delete(sysid).then(function(value) {
    	console.log(value);
    }, function(value) {
    	console.log(value);
    });
}