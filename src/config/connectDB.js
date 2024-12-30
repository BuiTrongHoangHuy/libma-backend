const {Sequelize} = require('sequelize');
require('dotenv').config();
const DB_ADDRESS = process.env.DB_ADDRESS || 'localhost';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'password';
const DB_DIALECT = process.env.DB_DIALECT || 'mysql';
// Option 1: Passing a connection URI
//const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('libma', 'admin', MYSQL_PASSWORD, {
    host: DB_ADDRESS,
    dialect: DB_DIALECT
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;