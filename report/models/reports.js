'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reports = sequelize.define('Reports', {
    trxId: DataTypes.STRING,
    accountNo: DataTypes.INTEGER,
    postedAmount: DataTypes.FLOAT,
    postedDate: DataTypes.DATE,
    postedBy: DataTypes.STRING
  }, {});
  Reports.associate = function(models) {
    // associations can be defined here
  };
  return Reports;
};