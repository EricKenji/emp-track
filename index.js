const inquirer = require('inquirer');
require('console.table');
const db = require('./db/connection');


db.connect(err => {
    if (err) throw err;
    userMenu();
});

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
                'Update an Employee Role',
                'Exit Menu'
            ]
        }
    ])
    .then(function({ menu }) {
        switch(menu) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
            case 'Exit Menu':
                db.end();
                break;
            
        }
    })
};

function viewDepartments() {
    const sql = 'SELECT * FROM department';
    
    db.query(sql, (err, res) => {
        console.log('*** Viewing All Departments ***');
        console.table(res);
        userMenu();
    });
};

function viewRoles() {
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department 
                FROM role 
                INNER JOIN department ON role.department_id=department.id;`;
    
    db.query(sql, (err, res) => {
        console.log('*** Viewing All Roles ***');
        console.table(res);
        userMenu();
    });
};

function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager
                FROM employee 
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON department.id = role.department_id
                LEFT JOIN employee mgr ON mgr.id = employee.manager_id;`;
    
    db.query(sql, (err, res) => {
        console.log('*** Viewing All Employees ***');
        console.table(res);
        userMenu();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            name: 'newDept',
            type: 'input',
            message: 'What is the name of the department?'
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO department (name) VALUES ('${answer.newDept}')`;
        db.query(sql, (err, res) => {
            console.log('Department added!');
            userMenu();
        });
    });
};

function addRole() {
    inquirer.prompt([
        {
            name: 'newRole',
            type: 'input',
            message: 'What is the name of the role?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of this role?'
        },
        {
            name: 'deptId',
            type: 'input',
            message: 'What is the department ID of this role?'
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO department (name) VALUES ('${answer.newDept}')`;
        db.query(sql, (err, res) => {
            console.log('Department added!');
            userMenu();
        });
    });
};

function addEmployee() {
    inquirer.prompt([
        {
            name: 'newDept',
            type: 'input',
            message: 'What is the name of the department?'
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO department (name) VALUES ('${answer.newDept}')`;
        db.query(sql, (err, res) => {
            console.log('Department added!');
            userMenu();
        });
    });
};








