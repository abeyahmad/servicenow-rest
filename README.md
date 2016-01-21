ServiceNow REST API
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
Early Alpha. Everything returns promises

Do your worst.
# GlideRecord #
```javascript
var GlideRecord = require('servicenow-rest').gliderecord;

var gr = new GlideRecord('instance','tablename','user','password')
```

## query ##
```javascript

gr.setReturnFields('number,short_description');
gr.addEncodedQuery('active=true');
gr.setLimit(10);


gr.query().then(function(response){ //returns promise
	console.log(response.body.results)
})
```
## get ##
```javascript

gr.get('sysid').then(function(response){
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

# ImportSet #

# Attachment #

# IdentifyReconcile #

# RoleInheritance #