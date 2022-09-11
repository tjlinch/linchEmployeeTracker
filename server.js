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
                exit();
                break;
        }
    })
}