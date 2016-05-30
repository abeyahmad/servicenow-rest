var Attachment = require('../attachment.js');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var user = process.env.snuser;
var pass = process.env.snpass;
// var instance = process.env.sninstance;
var instance = 'dev18189';
var table = 'incident';


var att = new Attachment(instance, user, pass, 'v1')


describe('Test Attachment functions', function(done) {
    it('Get Attachments', function(done) {
        att.getAttachments('incident', '9fc87cc0db0b1a0085ee72ffbf961905', __dirname)
            .then(function(value) {
                done();
            })

    });
    it('Attach Files', function(done) {Attachment
        att.attachFile('incident', '0e52d3fbdb23120085ee72ffbf9619db', 'h264.mov').then(function(value) {
            console.log(value);
        })
    })
});
// att.getAttachment('c9bdc223db23120085ee72ffbf96197a',__dirname).then(function (value) {
//   console.log(value);
// })
// describe('Get Record Attachment IDs', function() {
//     it('get record attachment ids', function(done) {
//       att.getAttachmentIds().then(value => {
//         console.log(value);
//         done();
//       })
//     });
// });
