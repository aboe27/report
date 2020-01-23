const model = require('../models');

exports.insertReports = async(req, res) =>{
  try {
    let data = req.body;
    await model.reports.create({
      trxId : data.trxId,
      accountNo : data.accountNo,
      accountName : data.accountName,
      installmentNo : data.installmentNo,
      plafon : data.plafon,
      postedAmount : data.postedAmount,
      postedDate : data.postedDate,
      postedBy : data.postedBy,
      ket :data.ket
    }).then(async (report)=> {
      res.status(200).json({
        status: 'ok',
        data:report
      })
    })
  }catch (err) {
    res.status(400).json({
      status:(err.message)
    })

  }
};