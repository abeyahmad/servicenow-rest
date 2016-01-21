ServiceNow Promise
===============
This library is a wrapper for the REST API v1

## Table of contents
- [GlideRecord](#gliderecord)
- [GlideAggregate](#glideaggregate)
- [ImportSet](#importset)
- [Attachment](#attachment)
- [IdentifyReconcile](#identifyreconcile)
- [RoleInheritance](#roleinheritance)




# Quickstart #

# GlideRecord #


var GlideRecord = require('servicenow-rest').gliderecord;
var gr = new GlideRecord('instance','tablename','user','password')

gr.addEncodedQuery('active=true');
gr.setLimit(10);


gr.query().then(function(response){
	console.log(response.body.results)
})






client.query('cmdb_ci_server','name=abeyserver').then(function(value) {
	console.log(value);
})

client.get('table_name','sys_id').then(function(value) {
	console.log(value);
})

client.insert('table_name',obj).then(function(value) {
	console.log(value);
})

client.update('table_name','sys_id',obj).then(function(value) {
	console.log(value);
})

client.delete('table_name','sys_id').then(function(value) {
	console.log(value);
})

# GlideAggregate #
```javascript
var GlideAggregate = require('servicenow-rest').glideaggregate;

# ImportSet #

# Attachment #

# IdentifyReconcile #

# RoleInheritance #