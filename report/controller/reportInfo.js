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
    },
    attributes:[
      'trxId',
      'accountNo',
      'accountName',
      'installmentNo',
      'plafon',
      'postedAmount',
      'postedDate',
      'postedBy',
      'ket'
    ]
  }).then(async (report)=> {
    if ( report.length !== 0){
      let dataResponse = {};
      for(let idx=0; idx<report.length; idx++){
        if(!(report[idx].postedBy in dataResponse))
          dataResponse[report[idx].postedBy] = [];
        dataResponse[report[idx].postedBy].push(report[idx])
      }
      res.send({
        dataResponse
      })
    } else {
      res.status(404);
      res.send({
        message:"report not found"
      })
    }
  })
};

const findByPostedByAll = async (req,res)=>{
  await model['reports'].findAll({
    attributes:[
      'trxId',
      'accountNo',
      'accountName',
      'installmentNo',
      'plafon',
      'postedAmount',
      'postedDate',
      'postedBy',
      'ket'
    ]
  }).then(async (report)=> {
    if ( report.length !== 0){
      let dataResponse = {};
      for(let idx=0; idx<report.length; idx++){
        if(!(report[idx].postedBy in dataResponse))
          dataResponse[report[idx].postedBy] = [];
        dataResponse[report[idx].postedBy].push(report[idx])
      }
      res.send({
        dataResponse
      })
    } else {
      res.status(404);
      res.send({
        message:"report not found"
      })
    }
  })
};

const findByket = async (req,res)=> {
  let ket = req.params.ket;
  await model['reports'].findAll({
    where: {
      ket: ket
    },
    attributes: [
      'trxId',
      'accountNo',
      'accountName',
      'installmentNo',
      'plafon',
      'postedAmount',
      'postedDate',
      'postedBy',
      'ket'
    ]
  }).then(async (report)=> {
    if ( report.length !== 0){
      let dataResponse = {};
      for(let idx=0; idx<report.length; idx++){
        if(!(report[idx].ket in dataResponse))
          dataResponse[report[idx].ket] = [];
        dataResponse[report[idx].ket].push(report[idx])
      }
      res.send({
        dataResponse
      })
    } else {
      res.status(404);
      res.send({
        message:"report not found"
      })
    }
  })
};


/*const findByMonth = async (req,res)=>{

}*/

module.exports = {
  findAllReport,
  findByTrxId,
  findByAccountNo,
  findByPostedBy,
  findByPostedByAll,
  findByket
};