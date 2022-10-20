// Import all required modules
const mysql = require('mysql2');
const inquirer = require('inquirer');

const cTable = require ('console.table');
require('dotenv').config();
// Set the mysql connection using .env variables
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // MySQL password
      password: process.env.DB_PASSWORD,
      // MYSQL db name
      database: process.env.DB_NAME
    },
    console.log(`Connected to the workplace_db database.`)
  );

//Set up inquirer arrays to ask the questions
const mainMenu = [
    {
        type: 'list',
        message: 'Select an operation: ',
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add A Role", "Add an Employee", "Update an Employee Role"],
        name: 'command',
    },
]

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

const updQuestion = [
    {
        type: 'number',
        message: 'Enter the id of the employee to be updated: ',
        name: 'updID',
    },
    {
        type: 'number',
        message: 'Enter the id of the role to update the employee to: ',
        name: 'updRole',
    },
];
// Function to initialize the program, on a slight delay to not overlap the console
 function init (){

    setTimeout(() =>  {menuChoice();}, 1000) 
 
} 
// Asynced main function to run through the inquirer question sets on loop
async function menuChoice(){
    while (true){
  await inquirer
    .prompt(mainMenu)
    .then(async (choice) => {
    if (choice.command == 'View All Departments'){
        
        // Run function to view departments
      await readDepts()
        
    }
    else if(choice.command == 'View All Roles'){
        
        // Run function to view Roles
       await readRoles()
    }
    else if(choice.command == 'View All Employees'){
        // Run function to view all Employees
        
       await readEmployees()
    }
    else if(choice.command == 'Add a Department'){
        // Run function to add department
       await inquirer.prompt(deptQuestions)
         .then(async (data) => await writeDepartment(data));   
    }
    else if (choice.command == 'Add A Role'){
        // Run function to add role
       await inquirer.prompt(roleQuestions)
        .then(async(data) => await writeRole(data));
    }
    else if (choice.command == 'Add an Employee'){ 
        // Run function to add an employee      
       await inquirer.prompt(empQuestions)
        .then(async(data) => await writeEmployee(data));
    }
    else if(choice.command == 'Update an Employee Role'){
        // Run function to update an employee role
        await inquirer.prompt(updQuestion)
        .then(async(data) => await updateEmployee(data));
    }

    });
    }
};
// Initialize the program on start
init();


 function readDepts(){
    // Query for departments with space breaks after to not have the log overlapped
    db.query(`SELECT department.id AS "ID", department.name AS "Department" FROM department`, function (err, results) {
        console.log(`\n>Displaying Departments<`);
        console.table(results);
        console.log(`--------- \n \n \n \n \n \n \n`);
        return
    });
    
};

 function readRoles(){
    // Query for roles with space breaks after to not have overlap
    db.query(`SELECT a.id AS "ID", a.title AS "Title", a.salary AS "Salary", department.name AS "Department"  FROM role AS a JOIN department ON a.department_id = department.id;`, function (err, results) {
        console.log(`\n>Displaying Roles<`);
        console.table(results);
        console.log(`------ \n \n \n \n \n \n \n`);
       return
    });
};

 function readEmployees(){
    // Long query for employee table with space break after to not have overlap
   db.query(`SELECT a.id AS "ID", a.first_name AS "First Name", a.last_name AS "Last Name", title AS "Title", department.name as "Department", salary AS "Salary", concat(b.first_name, " ", b.last_name) AS "Manager" FROM employee AS a LEFT JOIN employee as b ON a.manager_id = b.id JOIN role ON a.role_id = role.id JOIN department ON department_id = department.id;`, function (err, results){
        console.log(`\n>Displaying Employees<`);
        console.table(results);
        console.log(`------- \n \n \n \n \n \n \n`);
       return
    });
};

function writeDepartment(data){
    // Gets name parameter of new department, inserts it into table
    const params = [data.deptName];
    const sql = `INSERT INTO department (name) VALUES (?)`

    db.query(sql, params, (err, result) => {
        console.log("Department successfully added to database!")
        return result;
    })
};

function writeRole(data){
    // Gets parameters of desired role, inserts it into role table
    const params = [data.roleName, data.roleSal, data.roleDept];
    const sql = `INSERT INTO role (title,salary,department_id) VALUES (?,?,?)`

    db.query(sql, params, (err, result) => {
        console.log("Role successfully added to database!")
        return result;
    })
};

function writeEmployee(data){
    // Checks if manager is a valid or not, falsey creates query with null, truthy creates full query with manager id reference
    if (!data.empMang){
        const sql = `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`
        const params = [data.empFName, data.empLName, data.empRole, null];
        db.query(sql, params, (err, result) => {
            console.log("Employee successfully added to database!")
            return result;
        })
    }
    else {
        const sql = `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`
        const params = [data.empFName, data.empLName, data.empRole, data.empMang];
        db.query(sql, params, (err, result) => {
            console.log("Employee successfully added to database!")
            return result;
        })
    }
};

function updateEmployee(data){
    // Grabs ID of employee and desired role, runs update query.
    const paramID = data.updID;
    const paramRole = data.updRole;
    db.query(`UPDATE employee SET role_id = ${paramRole} WHERE id = ${paramID};`,(err, result) => {
        console.log("Employee Successfully updated!");
        return result;
    });
};