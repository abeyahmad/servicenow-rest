
var ImportSet = require('../importset.js');


var user = process.env.user,
    password = process.env.password,
    instance = process.env.instance;

var gr = new ImportSet(instance, 'imp_user', user, password);
gr.insert([{
	last_name:'Ahmad',
	first_name:'Abey',
	email:'abey@elucent.io',
	phone:'+15712180978'
},{
	last_name:'Ahmad',
	first_name:'Yousef',
	email:'andrew@elucent.io',
	phone:'+8049265743'
},{
	last_name:'Ahmad',
	first_name:'sarah',
	email:'sarah@elucent.io',
	phone:'+18049265743'
}]).then(function(value) {
	console.log(value);
})


var gr = new ImportSet(instance, 'imp_user', user, password);

gr.get('27ff57aa4f899600839b8c318110c73e').then(function(value) {
	console.log(value);
});   