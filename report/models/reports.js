'use strict';
module.exports = (sequelize, DataTypes) => {
  const reports = sequelize.define('reports', {
    trxId: DataTypes.STRING,
    accountNo: DataTypes.INTEGER,
    installmentNo: DataTypes.INTEGER,
    postedAmount: DataTypes.FLOAT,
    postedDate: DataTypes.DATE,
    postedBy: DataTypes.STRING
  }, {});
  reports.associate = function(models) {
    // associations can be defined here
  };
  return reports;
};