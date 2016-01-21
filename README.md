ServiceNow Promise
===============
This library is a wrapper for the REST API v1 using promises
## Quickstart

```javascript
var ServiceNow = require('servicenow-promise');
var client = new ServiceNow('instance','user','password')

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