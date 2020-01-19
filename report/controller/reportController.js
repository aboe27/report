const model = require('../models');

exports.insertReports = async(req, res) =>{
  try {
    let data = req.body;
    await model['Reports'].create({
      trxId : data.trxId,
      accountNo : data.accountNo,
      postedAmount : data.postedAmount,
      postedDate : data.postedDate,
      postedBy : data.postedBy
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