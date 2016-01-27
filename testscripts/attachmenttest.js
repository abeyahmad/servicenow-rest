var Attachment = require('../attachment.js');

var user = process.env.user,
    password = process.env.password,
    instance = process.env.instance;
var table = 'incident';
var record = 'a4e076aa4f899600839b8c318110c724';

//get('5db41ec64f12020031577d2ca310c7e3');

// getAttachment('5db41ec64f12020031577d2ca310c7e3', '..\\')
// getAttachments('incident', 'a4e076aa4f899600839b8c318110c724', "test")
attachFile('incident','a4e076aa4f899600839b8c318110c724','Pasted\ Image.png','..\\')









function get(sysid) {
    var gr = new Attachment(instance, user, password);
    gr.get(sysid).then(function(value) {
        console.log(value);
    })
}


function getAttachment(sysid, dir) {
    var gr = new Attachment(instance, user, password);
    gr.getAttachment('5db41ec64f12020031577d2ca310c7e3', dir).then(function(value) {
        console.log('success'+value);
    }).catch(function(error) {
        console.log(error);
    })
}


function getAttachments(tablename, sysid, dir) {
    var gr = new Attachment(instance, user, password);
    gr.getAttachments(tablename, sysid, dir)
        .then(function(value) {
            console.log(value);
        })
}
function attachFile(tablename, sysid, file,dir) {
    var gr = new Attachment(instance, user, password);
    gr.attachFile(tablename, sysid, file,dir).then(function(value) {
        console.log(value);
    });
}

function query(instance, user, password) {
    var gr = new Attachment(instance, user, password);
    gr.query().then(function(value) {
        console.log(value);
        for (var i = value.length - 1; i >= 0; i--) {
            console.log(value[i].table_name);
        };
    })
}