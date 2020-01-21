const model = require('../models');

const findAllReport = async (req,res)=>{
  await model['reports'].findAll().then(function (report) {
    res.send(report)
  }).catch(function(err) {
    return (err);
  });
};

const findByTrxId = async (req,res,next)=>{
  let trxId = req.params.trxId;
  await model['reports'].findOne({
    where:{
      trxId : trxId
    }
  }).then(async (report)=>{
    try {
      if (report.length !== 0){
        res.send({
          message:{
            report
          }
        })
      } else {
        next();
      }
    }catch{
      res.status(404);
      res.send({
        message: "report not found"
      })
    }
  })
};

const findByAccountNo = async (req,res)=>{
  let accountno = req.params.accountNo;
  await model['reports'].findAll({
    where:{
      accountNo:accountno
    }
  }).then(async (report)=> {
    if ( report.length !== 0){
      res.send({
        message:{
          report
        }
      })
    } else {
      res.status(404);
      res.send({
        message:"not found"
      })
    }
  }).catch(()=>{
    res.status(400).json({
      message:"bad request"
    })
  })
};

const findByPostedBy = async (req,res)=>{
  let postedby = req.params.postedBy;
  await model['reports'].findAll({
    where:{
      postedBy:postedby
    }
  }).then(async (report)=> {
    if ( report.length !== 0){
      res.send({
        message:{
          report
        }
      })
    } else {
      res.status(404);
      res.send({
        message:"report not found"
      })
    }
  })
};

module.exports = {
  findAllReport,
  findByTrxId,
  findByAccountNo,
  findByPostedBy
};