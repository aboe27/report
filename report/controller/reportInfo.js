const model = require('../models');

const findAllReport = async (req,res)=>{
  const page = req.query.page
  const limit = 10
  await model['reports'].findAndCountAll(
    { offset: (page*limit)-limit, limit},
  )
    .then(function (report) {
        res.send({
          message:report,
          totalPage:Math.ceil(report.count/limit)
        })
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
  const page = req.query.page
  const limit = 10
  let postedby = req.params.postedBy;
  await model.reports.findAndCountAll({
    where:{
      postedBy:postedby
    },
    offset: (page*limit)-limit, limit,
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
      res.send({
        message:report,
        totalPage:Math.ceil(report.count/limit)
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
  const page = req.query.page
  const limit = 10
  let ket = req.params.ket;
  await model['reports'].findAndCountAll({
    where: {
      ket: ket
    },
    offset: (page*limit)-limit, limit,
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
      res.send({
        message:report,
        totalPage:Math.ceil(report.count/limit)
      })
    } else {
      res.status(404);
      res.send({
        message:"report not found"
      })
    }
  })
};

const listCo = async (req,res)=>{
  const page = req.query.page
  const limit = 10
  let postedby = req.params.postedBy
  await model['reports'].findAndCountAll({
    where :{
      postedBy : postedby,
      ket : 'ontime'
    },
    offset: (page*limit)-limit, limit,
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
      res.send({
        message:report,
        totalPage:Math.ceil(report.count/limit)
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
  findByket,
  listCo
};