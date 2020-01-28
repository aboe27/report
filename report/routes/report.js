const express = require('express');
const router = new express.Router();

let report = require('../controller/reportController');
let reportIn = require('../controller/reportInfo');

router.post('/insert',report.insertReports);

router.get('/all',reportIn.findAllReport);
router.get('/postby/:postedBy',reportIn.findByPostedBy);
router.get('/ket/:ket',reportIn.findByket);

/*router.get('/trx/:trxId',reportIn.findByTrxId);
router.get('/listco/:postedBy',reportIn.listCo);
router.get('/acno/:accountNo',reportIn.findByAccountNo);
router.get('/postby',reportIn.findByPostedByAll);
router.get('/customers/:postedBy',reportIn.listNasabahByCo);*/

module.exports = router;