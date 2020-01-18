'use strict';
module.exports = (sequelize, DataTypes) => {
  const reports = sequelize.define('reports', {
    trx_id: DataTypes.INTEGER,
    account_no: DataTypes.INTEGER,
    posted_amount: DataTypes.INTEGER,
    posted_date: DataTypes.DATE,
    posted_by: DataTypes.STRING
  }, {});
  reports.associate = function(models) {
    // associations can be defined here
  };
  return reports;
};