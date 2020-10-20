
const path = require('path');
// this will load .env parameters to process.env
const env = require('dotenv').config({path: path.join(__dirname, '.env')});
const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
console.log(`${username}`)
const Sequelize = require('sequelize');
const sequelize = new Sequelize(`postgres://${username}:${password}@svr-psql-orapg-111.postgres.database.azure.com/postgres?ssl=true`);
module.exports = sequelize;