const mysql = require('mysql2');

//Connect to the database
const db = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password: '',
        database: 'test'
    }
);

module.exports = db;