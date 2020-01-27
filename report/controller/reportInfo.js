const model = require('../models');

//SEMUA REPORT(1)//
const findAllReport = async (req,res)=>{
  const page = req.query.page;
  const limit = 10;
  try {
    await model['reports'].findAndCountAll({
      offset: (page*limit)-limit,
      limit
    })
      .then(function (report) {
        res.send({
          message:report,
          totalPage:Math.ceil(report.count/limit)
        })
      }).catch(function(err) {
        return (err);
      });
  }catch (err) {
    res.status(400).json({
      status:(err.message)
    })
  }
};

//SEMUA PEMBAYARAN YANG TERLAMBAT(2)//
const findByket = async (req,res)=> {
  const page = req.query.page;
  const limit = 10;
  let ket = req.params.ket;
  try {
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
  }catch (err) {
    res.status(400).json({
      status:(err.message)
    })
  }
};

//LAPORAN TRANSAKSI BERDASARKAN CO(3)//
const findByPostedBy = async (req,res)=>{
  const page = req.query.page;
  const limit = 10;
  let postedby = req.params.postedBy;
  try {
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
  }catch (err) {
    res.status(400).json({
      status:(err.message)
    })
  }
};

/*//LIST NASABAH BERDASARKAN CO//
const listNasabahByCo = async (req, res) =>{
  let postedBy = req.params.postedBy;
  await model['reports'].findAll({
    where :{
      postedBy : postedBy
    },
    attributes:[
      'accountNo',
      'accountName',
      'postedBy'
    ]
  }).then(async (report)=> {
    if ( report.length !== 0){
      let result = [];
      let currentAccountName;
      for (let i=0; i<report.length;i++){
        if (report[i].accountName !== currentAccountName){
          result.push(report[i]);
          currentAccountName = report[i].accountName;
        }
      }
      res.send({
        message:result,
      })
    } else {
      res.status(404);
      res.send({
        message:"report not found"
      })
    }
  })
};

//PEMBAYARAN YANG TERLAMBAT BERDASARKAN CO//
const listCo = async (req,res)=>{
  const page = req.query.page;
  const limit = 10;
  let postedby = req.params.postedBy;
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

//MENCARI BERDASARKAN NOMOR TRANSAKSI//
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

//MENCARI TRANSAKSI BERDASARKAN NOMOR ACCOUNT//
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


//SEMUA TRANSAKSI DIURUTKAN BERDASARKAN CO//
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

const sum = async (req, res) =>{
  await model['reports'].findAll({
    attributes:[
      'accountNo',
      'accountName',
      'plafon'
    ]
  }).then(async (report)=> {
    if ( report.length !== 0){
      let result = [];
      let currentAccountName;
      for (let i=0; i<report.length;i++){
        if (report[i].accountName !== currentAccountName){
          result.push(report[i]);
          currentAccountName = report[i].accountName;
        }
      }
      res.send({
        message:result,
        totalPlafon:sum(report.plafon)
      })
    } else {
      res.status(404);
      res.send({
        message:"report not found"
      })
    }
  })
};*/

module.exports = {
  findAllReport,
  findByPostedBy,
  findByket,
  /*listCo,
  findByPostedByAll,
  findByTrxId,
  listNasabahByCo,
  findByAccountNo,
  sum*/
};