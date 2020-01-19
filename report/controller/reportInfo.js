const model = require('../models');

exports.findAllReport = async (req,res,nex)=>{
  await model['Reports'].findAll().then(function (reports) {
    res.send(reports)
  }).catch(function(err) {
    return (err);
  });
};