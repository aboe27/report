const model = require('../models');

exports.insertReports = async(req, res) =>{
  try {
    let data = req.body;
    await model['reports'].bulkCreate(data).then(async (report)=> {
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