'use strict';
module.exports = (sequelize, DataTypes) => {
  const reports = sequelize.define('reports', {
    trxId: DataTypes.STRING,
    accountNo: DataTypes.INTEGER,
    accountName: DataTypes.STRING,
    installmentNo: DataTypes.INTEGER,
    plafon: DataTypes.DOUBLE,
    postedAmount: DataTypes.DOUBLE,
    postedDate: DataTypes.DATE,
    postedBy: DataTypes.STRING,
    ket: DataTypes.STRING
  }, {});
  reports.associate = function(models) {
    // associations can be defined here
  };
  return reports;
};