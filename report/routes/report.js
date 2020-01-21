const express = require('express');
const router = new express.Router();

let report = require('../controller/reportController');
let reportIn = require('../controller/reportInfo');

router.post('/insert',report.insertReports);

router.get('/all',reportIn.findAllReport);
router.get('/trx/:trxId',reportIn.findByTrxId);
router.get('/acNo/:accountNo',reportIn.findByAccountNo);
router.get('/postBy/:postedBy',reportIn.findByPostedBy);

module.exports = router;