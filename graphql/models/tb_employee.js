const Sequelize = require('Sequelize');
const sequelize = require('../initializeDb');
const tb_employee = sequelize.define('Tb_Employee', {
  emp_name: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  emp_sal: Sequelize.INTEGER,
  emp_company: Sequelize.STRING,
  emp_status: Sequelize.STRING
}, {
  schema: 'public',
  tableName: 'tb_employee',
  timestamps: false,
});


module.exports = tb_employee;