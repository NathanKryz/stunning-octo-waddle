const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // MySQL password
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the workplace_db database.`)
  );
// Set up inquirer to ask the questions
const mainMenu = [
    {
        type: 'list',
        message: 'Select an operation: ',
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add A Role", "Add an Employee", "Update an Employee Role"],
        name: 'command',
    },
];

const deptQuestions = [
    {
        type: 'input',
        message: 'Enter the name of the new department: ',
        name: 'deptName',
    },
];
const roleQuestions = [
    {
        type: 'input',
        message: 'Enter the name of the new role: ',
        name: 'roleName',
    },
    {
        type: 'number',
        message: 'Enter the salary of the new role: ',
        name: 'roleSal',
    },
    {
        type: 'number',
        message: 'Enter the department number the new role is a part of: ',
        name: 'roleDept',
    }

];

const empQuestions = [
    {
        type: 'input',
        message: 'Enter the first name of the new employee: ',
        name: 'empFName',
    },
    {
        type: 'input',
        message: 'Enter the last name of the new employee: ',
        name: 'empLName',
    },
    {
        type: 'number',
        message: 'Enter the role id number to be assigned to this employee: ',
        name: 'empRole',
    },
    {
        type: 'number',
        message: 'Enter the id of the new employees manager, if any: ',
        name: 'empMang',
    },
];
// Functions to push into the respective table database
// View employees 
// View all roles
// View all departments
// Functions to update employee role