const mysql = require('mysql2');

//Connect to the database
const db = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log('Connected to the Employee database!')
);

module.exports = db;