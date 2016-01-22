var GlideAggregate = require('../glideaggregate.js');
var user = process.env.user,
    password = process.env.password,
    instance = process.env.instance;


var gr = new GlideAggregate(instance, 'incident', user, password);
gr.addEncodedQuery('active=true');
gr.addCount(true);
gr.groupBy('impact');
gr.addAggregate('SUM','impact');
//gr.addHaving('sum','impact','>',1);
//gr.orderByDescending();
//gr.displayValue = true;
console.log(gr.reqobj);
gr.query().then(function(value) {
	console.log(value);
},function(value) {
	console.log('error'+JSON.stringify(value));
})