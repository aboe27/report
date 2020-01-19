

module.exports = function (app) {

  let report = require('../controller/reportController');
  let reportIn = require('../controller/reportInfo');

  app.post('/api/v0.0.1/report/insert',report.insertReports);
  app.get('/api/v0.0.1/report',reportIn.findAllReport);

};