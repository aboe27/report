var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app.js');
var assert = chai.assert;
var models = require('../models');

chai.use(chaiHttp);
var requester = chai.request(app).keepOpen();


describe('reports',function () {

  var idReport = '';

  beforeEach(function (done) {
    models.reports.destroy({
      where:{}
    }).then(function () {
      models.reports.create({
        trxId:"aa19008",
        accountNo:"2419002",
        accountName:"nasabah19",
        installmentNo:3,
        plafon:10000,
        postedAmount:200000,
        postedDate:"2019-11-15",
        postedBy:"CO2",
        ket:"ontime"
      }).then(function (report) {
        idReport =report.id;
        done()
      })
    })
  });

  describe('GET /report',function () {
    it('will return all report',function (done) {
      requester
        .get('/v0.0.1/report/all')
        .end(function (err,res) {
          assert.equal(res.status,200);
          done()
        })
    });
    it('will return all late report',function (done) {
      requester
        .get('/v0.0.1/report/ket')
        .end(function (err,res) {
          assert.equal(res.status,200);
          done()
        })
    });
    it('will return all late report',function (done) {
      requester
        .get('/v0.0.1/report/postBy')
        .end(function (err,res) {
          assert.equal(res.status,200);
          done()
        })
    })
  })


});