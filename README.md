ServiceNow REST
===============
Comprehensive wrapper for the ServiceNow REST API's

Promise based

Contact abey@elucent.io for any questions, feedback, issues, or feature requests.

Update 5/29/2016:
Major revisions to GlideRecord and Attachment API
Update 1/27/2016:
Added clone method to GlideRecord


Update 1/26/2016:
v1 Release


Update 1/21/2016:
GlideRecord is fully functional
Built out skeleton of other REST APIs



## Table of contents ##
- [GlideRecord](#gliderecord)
  - query
  - get
  - insert
  - update
  - clone
  - delete
- [GlideAggregate](#glideaggregate)
  - query
- [ImportSet](#importset)
  - get
  - insert
- [Attachment(Geneva)](#attachment)
  - get
  - getAttachment
  - getAttachments
  - attachFile
- [About Promises](#aboutpromises)
- Questions and Issues
- Authors



## Install ##

npm install servicenow-rest

## GlideRecord ##
```javascript
var GlideRecord = require('servicenow-rest').gliderecord;

var gr = new GlideRecord('instance','tablename','user','password','v1')
```
Version is optional
### query ###
```javascript
//methods options
gr.setReturnFields('number,short_description');
gr.addEncodedQuery('active=true');
gr.setLimit(10);

gr.query().then(function(result){ //returns promise
	console.log(result)
})
```
### get ###
```javascript

gr.get('sysid').then(function(result){
	//your code
}).catch(error) {
	//errors
})
```
### insert ###
```javascript
var obj = {
	short_description:"Production Server down",
	description:"latin words here",
	priority:1
};
gr.insert(obj).then(function(response){
	//your code
}).catch(error) {
	//errors
})
```
### update ###
```javascript
var obj = {
	comment:"hey whats up"
}
gr.update('sysid',obj).then(function(response){
	//your code
}).catch(error) {
	//errors
})
```
### clone ###
```javascript
//two parameters
//sysid of record you want to clone
//array fields that you want to clone
var arr1 = ['short_description','description']
gr.clone('sysid',arr1).then(function(value) {
	console.log(value);
})
```
### addProxy ###
If proxy requires credentials they need to be embedded in the URL

```javascript
gr.addProxy('https://user:pass@myproxy.com');
```
### delete ###
```javascript

gr.get('sysid').then(function(response){
	//your code
}).catch(error) {
	//errors
})
```

## GlideAggregate ##
```javascript
var GlideAggregate = require('servicenow-rest').glideaggregate;
```
### query ###
```javascript
gr.addEncodedQuery('encodedquery')
gr.addAggregate('agg','fieldname') //agg options: MIN,MAX,SUM,AVG
gr.groupBy('fieldname')
gr.addHaving('sum','impact','>',1) // Aggregate,fieldname,operator,value
gr.addCount(int) //integer
gr.orderByDescending() // Automatically sorts by ascending

gr.query().then(function(value) {
	console.log(value);
})
```
## ImportSet ##

Create records on import set tables that are immediately transformed

```javascript
var ImportSet = require('servicenow-rest').importset;

var gr = new ImportSet('instance','tablename','user','password') //tablename should be the import table here
```
### get ###

gr.get(sysid).then(function(value) {
    console.log(value);
}
### insert ###
gr.get(



## Attachment ##
```javascript
var Attachment = require('servicenow-rest').attachment;

var gr = new Attachment('instance','tablename','user','password')
```
### get ###
```javascript
gr.get(sysid).then(function(value) {
	console.log(value);
})
```
### delete ###
```javascript
gr.delete(sysid).then(function(value) {
	console.log(value);
})
```
### getAttachment ###
```javascript
gr.getAttachment(sysid).then(function(value) {
	console.log(value)
})
```
### getAttachments ###
```javascript
gr.getAttachments(tablename,sysid,dir)
    .then(function(value) {
        console.log(value); //value is an array of file names attached
    })
```
### attachFile ###
```javascript
gr.attachFile(tablename, sysid,file,dir).then(function(value) {
    console.log(value);
});
```





##About Promises##

A promise is an alternative to callback hell. It's pretty simple

```javascript
gr.query() //This right here returns a 'promise'
	.then(function(value) {
	//code when successful
	},function(error) {
		code when failed
	}) //resolve and reject are functions with one argument. When the request succeeds, the resolve function is called. When it fails, the reject function is called

//alternative
gr.query().then(function(value) {

}).catch(function(error) {
	/error code here
})
```
##Questions and Issues##
For feature requests and bug reports please use the github issue tracker. For immediate support join the ServiceNow Slack Community (get an auto-invite here: http://snowslack.io) or email abey@elucent.io

##Authors##
Abey Ahmad.
Contributors Welcome



<!-- ## IdentifyReconcile ##
```javascript
var IdentifyReconcile = require('servicenow-rest').idreconcile;

var gr = new IdentifyReconcile('instance','tablename','user','password')
```
```
###insert###
```javascript

```

## RoleInheritance ##
```javascript
var RoleInheritance = require('servicenow-rest').userrole

var gr = new RoleInheritance('instance','tablename','user','password')
```

###get###
```javascript -->
