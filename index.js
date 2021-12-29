const inquirer = require('inquirer');
require('console.table');
const db = require('./db/connection');




function userMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Please select from the following options: ',
            choices: [
                'View All Departments', 
                'View All Roles', 
                'View All Employees', 
                'Add a Department', 
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role'
            ]
        }
    ]);
};

db.connect(err => {
    if (err) throw err;
    console.log('Connected!');
    userMenu();
});

