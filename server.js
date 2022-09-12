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
   
    //============================================//
    //TODO: add connection to manager name instead of id
    //============================================//

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
                console.log('New department added');
                promptUser();
            }
        )
    })
}

function addARole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the title of the new role', 
            name: 'newRoleTitle'
        },
        {
            type: 'input',
            message: 'Enter the salary for the new role',
            name: 'newRoleSalary'
        },
        {
            type: 'input',
            message: 'Input the department id for this role',
            name: 'newRoleDepartment'
        }
        //==========================================//
        //TODO: switch input from id to select the department name
        //=========================================//
        
        // {
        //     type: 'list',
        //     message: 'Which department does the new role belong to?',
        //     name: 'newRoleDepartment',
        //     choices: ['Sales', 'Marketing', 'Accounting', 'RnD', 'Legal', 'Executive', 'Customer Service']
        // }
    ]).then(function (input) {
        connection.query(`INSERT INTO role(title, salary, department_id) VALUES ('${input.newRoleTitle}', ${input.newRoleSalary}, '${input.newRoleDepartment}')`,
            function(err, res) {
                if (err) throw err;
                console.log('New role added');
                promptUser();
            }
        )
    })
}

//================================================//
//Revisit to ask for role and manager, rather than ids
//================================================//

function addAnEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employees first name?', 
            name: 'newEmployeeFirstName'
        },
        {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'newEmployeeLastName'
        },
        {
            type: 'input',
            message: 'What is the role id?',
            name: 'newEmployeeRole'
        },
        {
            type: 'input',
            message: 'What is the managers id?',
            name: 'newEmployeeManager'
        }
    ]).then(function (input) {
        connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('${input.newEmployeeFirstName}', '${input.newEmployeeLastName}', ${input.newEmployeeRole}, ${input.newEmployeeManager})`,
            function(err, res) {
                if (err) throw err;
                console.log('New employee added');
                promptUser();
            }
        )
    })
}

function updateEmployeeRole() {
    connection.query('SELECT employee.first_name, employee.last_name FROM employee', function(err, res) {
        if (err) throw err;
        // console.log(res)
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which employee would you like to update?',
                name: 'updateEmployee',
                choices: function() {
                    const names = [];
                    
                    for (i = 0; i < res.length; i++) {
                        names.push(`${res[i].first_name} ${res[i].last_name}`);
                    }
                    return names;
                }
            },
            {
                type: 'list',
                message: 'What is the employees new job title?',
                name: 'updateEmployeeRole',
                choices: ['Accountant', 'CEO', 'CFO', 'Customer Service Rep.', 'Director of Marketing', 'Engineer', 'Lawyer', 'Sales Manager', 'Salesperson', 'Senior Engineer']
                // function() {
                //     const roles = [];
                //     connection.query('SELECT role.title FROM role', function(err, res) {
                //         if (err) throw err;
                //         // console.log(res);
                //         for (i = 0; i < res.length; i++) {
                //             roles.push(res[i].title);
                //         }
                //     })
                // return roles;
                // }
            }
        ]).then(function(input) {
            console.log(input);
            promptUser();
        })
    })
}