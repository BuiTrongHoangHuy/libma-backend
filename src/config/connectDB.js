const {Sequelize} = require('sequelize');
require('dotenv').config();
const DB_ADDRESS = process.env.DB_ADDRESS || 'localhost';
const DB_URL = process.env.DATABASE_URL || 'mysql';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'password';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'libma';
const MYSQL_USER = process.env.MYSQL_USER || 'admin';
const DB_DIALECT = process.env.DB_DIALECT || 'mysql';
const MYSQL_PORT = process.env.MYSQL_PORT || '3306';
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    host: DB_ADDRESS,
    dialect: DB_DIALECT,
    pool:{
        max: 5,
        min: 0,
        acquire:30000,
        idle: 100000,
    },
    dialectOptions: {
        connectTimeout: 10000,
    }
});

//const sequelize = new Sequelize(DB_URL)
let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;