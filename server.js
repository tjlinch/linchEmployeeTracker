const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require('./config/connection');

connection.connect((err) => {
    if (err) throw err;
    console.log('||==============================||');
    console.log('||                              ||');
    console.log('||       Employee Tracker       ||');
    console.log('||                              ||');
    console.log('||==============================||');
    promptUser();
});

const promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Welcome to employeeTracker! Which action would you like to perform?',
            name: 'homeChoices',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]
    ).then (function (input) {
        switch(input.homeChoices) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addADepartment();
                break;
            case 'Add a role':
                addARole();
                break;
            case 'Add an employee':
                addAnEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    })
}

function viewAllDepartments() {
    connection.query('SELECT * FROM department',
    function(err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}

function viewAllRoles() {
    connection.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role, department WHERE department.id = role.department_id',
    function(err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}

function viewAllEmployees() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id FROM employee, role, department WHERE role.id = employee.role_id AND department.id = role.department_id;',
    // role.title AS role, role.salary as salary,
    // INNER JOIN role ON employee.role_id = role.title
    function(err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}

function addADepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Name the new department', 
            name: 'newDepartment'
        }
    ]).then(function (input) {
        connection.query(`INSERT INTO department(name) VALUES ('${input.newDepartment}')`,
            function(err, res) {
                if (err) throw err;
                console.table(res);
                viewAllDepartments();
                promptUser();
            }
        )
    })
}

function addARole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Name the new role', 
            name: 'newRoleTitle'
        },
        {
            type: 'input',
            message: 'What is this roles salary?',
            name: 'newRoleSalary'
        },
        {
            type: ''
        }

    ]).then(function (input) {
        connection.query(`INSERT INTO role(title, salary) VALUES ('${input.newRoleTitle}', ${input.newRoleSalary})`,
            function(err, res) {
                if (err) throw err;
                console.table(res);
                viewAllRoles();
                promptUser();
            }
        )
    })
}