const model = require('../models');

exports.insertReports = async(req, res) =>{
  try {
    await model['reports'].bulkCreate(
      req.body
    ).then(async (report)=> {
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