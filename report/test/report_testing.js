var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app.js');
var assert = chai.assert;
var models = require('../models')

chai.use(chaiHttp);
var requester = chai.request(app).keepOpen();

describe('reports',function (done) {

  var idReport = '';

  beforeEach(function (done) {
    models.reports.destroy({
      where:{}
    }).then(function () {
      models.reports.create({
        trxId:"aa19008",
        accountNo:2419002,
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

  })

});