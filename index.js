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
                "Update an Employee's Manager",
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
            case "Update an Employee's Manager":
                updateEmployeeManager();
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
        const sql = `INSERT INTO role (title, salary, department_id) 
                    VALUES ('${answer.newRole}', ${answer.salary}, ${answer.deptId})`;
        db.query(sql, (err, res) => {
            console.log('Role added!');
            userMenu();
        });
    });
};

function addEmployee() {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: "What is the employee's first name?"
        },
        {
            name: 'lastName',
            type: 'input',
            message: "What is the employee's last name?"
        },
        {
            name: 'role',
            type: 'input',
            message: "What is the employee's role ID?"
        },
        {
            name: 'manager',
            type: 'input',
            message: "What is the employee's manager's ID?"
        },
    ])
    .then(answer => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                    VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.role}, ${answer.manager})`;
        db.query(sql, (err, res) => {
            console.log('Employee added!');
            userMenu();
        });
    });
};

function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: 'employee',
            type: 'input',
            message: "Enter the employee ID of the employee you would like to update."
        },
        {
            name: 'newRole',
            type: 'input',
            message: "What is this employee's new role ID?"
        }
    ])
    .then(answer => {
        const sql = `UPDATE employee
                    SET role_id = ${answer.newRole}
                    WHERE employee.id = ${answer.employee};`
        db.query(sql, (err, res) => {
            console.log('Employee Role updated!');
            userMenu();
        });
    });
};

function updateEmployeeManager() {
    inquirer.prompt([
        {
            name: 'employee',
            type: 'input',
            message: "Enter the employee ID of the employee you would like to update."
        },
        {
            name: 'newMgr',
            type: 'input',
            message: "What is this the ID of the employee's new manager?"
        }
    ])
    .then(answer => {
        const sql = `UPDATE employee
                    SET manager_id = ${answer.newMgr}
                    WHERE employee.id = ${answer.employee};`
        db.query(sql, (err, res) => {
            console.log('Employee Manager updated!');
            userMenu();
        });
    });
};










