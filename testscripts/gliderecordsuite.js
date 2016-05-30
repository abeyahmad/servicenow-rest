var GlideRecord = require('../GlideRecord.js');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

var user = process.env.snuser;
var pass = process.env.snpass;

var instance = process.env.sninstance || 'dev18189';
var table = 'incident';



describe('test all functions', function(value) {
    var gr = new GlideRecord(instance, table, user, pass, 'v2');
    describe('Verify constructor works', function() {
        it('base url', function() {
            var arr1 = gr.baseurl.match(/\w+\.service-now\.com\/api\/now\/v\d\/table\/\w+/);
        });
        it('user', function() {
            expect(gr.user).to.equal(user);
        });
        it('password', function() {
            expect(gr.pass).to.equal(pass);
        });

    });
    describe('Parameter set checks', function() {
        it('Add encoded query', function() {
            gr.setEncodedQuery(10);
            expect(gr.params).to.have.property('sysparm_query');
        })
        it('Set limit', function() {
            gr.setLimit(10);
            expect(gr.params).to.have.property('sysparm_limit');
        })

        it('Set return fields', function() {
            gr.setReturnFields(10);
            expect(gr.params).to.have.property('sysparm_fields');
        })
        it('Set Display', function() {
            gr.setDisplay(10);
            expect(gr.params).to.have.property('sysparm_display_value');
        })
        it('Set view', function() {
            gr.setView(10);
            expect(gr.params).to.have.property('sysparm_view');
        })
        it('Set offset', function() {
            gr.setOffset(10);
            expect(gr.params).to.have.property('sysparm_offset');
        })
        it('Set ExcludeReference', function() {
            gr.setExcludeReference(true);
            expect(gr.params).to.have.property('sysparm_exclude_reference_link');
        })

    })
    describe('calls', function() {
        var gt = new GlideRecord(instance, table, user, pass, 'v2');
        var incidentid = '';
        incobj = {};
        it('insert record', function(done) {
            gt.insert({
                short_description: 'Mocha Created Incident'
            }).then(function(value) {
                incobj = value;
                // console.log(incobj);
                done();
            });
        })
        it('Get specific record', function(done) {
            gt.get(incobj.sys_id).then(function(value) {
                expect(value).to.deep.equal(incobj);
                done();
            });
        });
        it('Update record', function(done) {
            gt.update(incobj.sys_id, {
                short_description: 'Updated by mocha'
            }).then(function(value) {
                done();
            });
        })
        it('Delete record', function(done) {
            gt.delete(incobj.sys_id).then(function(value) {
                console.log(value);
                done();
            });
        });
        // it('query table', function(done) {
        //     gt.setLimit(1);
        //     gt.query().then(function(value) {
        //         console.log(value);
        //         expect(value).to.be.instanceOf(Array);
        //         done();
        //     });
        // });


    })


})
