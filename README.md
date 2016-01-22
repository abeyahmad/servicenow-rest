ServiceNow REST API
===============
Comprehensive wrapper for the ServiceNow REST API's

Update 1/21/2016:
GlideRecord is fully functional
Built out skeleton of other REST APIs



## Table of contents ##
- [GlideRecord](#gliderecord)
- [GlideAggregate](#glideaggregate)
- [ImportSet](#importset)
- [Attachment(Geneva)](#attachment)
- [IdentifyReconcile(Geneva)](#identifyreconcile)
- [RoleInheritance(Geneva)](#roleinheritance)


# Install #

npm install servicenow-rest

# Quickstart #

# GlideRecord #
```javascript
var GlideRecord = require('servicenow-rest').gliderecord;

var gr = new GlideRecord('instance','tablename','user','password')
```

## query ##
```javascript
//All methods options
gr.setReturnFields('number,short_description');
gr.addEncodedQuery('active=true');
gr.setLimit(10);

gr.query().then(function(result){ //returns promise
	console.log(result)
})
```
## get ##
```javascript

gr.get('sysid').then(function(result){
	//your code
}).catch(error) {
	//errors
})
```
## insert ##
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
## update ##
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
## delete ##
```javascript

gr.get('sysid').then(function(response){
	//your code
}).catch(error) {
	//errors
})
```

# GlideAggregate #
```javascript
var GlideAggregate = require('servicenow-rest').glideaggregate;
```
## query ##

# ImportSet #
```javascript
var ImportSet = require('servicenow-rest').importset;

var gr = new ImportSet('instance','tablename','user','password')
```
## get ##
## insert ##

# Attachment #
```javascript
var Attachment = require('servicenow-rest').attachment;

var gr = new Attachment('instance','tablename','user','password')
```
## get ##
## getFile ##
## getFiles##
## getMeta ##
## attach ##
## attachMultiple ##
## delete ##

# IdentifyReconcile #
```javascript
var IdentifyReconcile = require('servicenow-rest').idreconcile;

var gr = new IdentifyReconcile('instance','tablename','user','password')
```
##insert##

# RoleInheritance #
```javascript
var RoleInheritance = require('servicenow-rest').userrole

var gr = new RoleInheritance('instance','tablename','user','password')
```

##get##

#Questions and Issues#
For feature requests and bug reports please use the github issue tracker. For immediate support join the ServiceNow Slack Community (get an auto-invite here: http://snowslack.io) or email abey@elucent.io

#Authors#
Abey Ahmad. 