// Required Packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Program runs while true
let usingDB = true;

// Connect to database.
const db = mysql.createConnection(
  {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'roster_db'
    },
    console.log(`Connected to the classlist_db database.`)
)

async function showMenu () {
  // Prompt the user for an action.
  const userOp = await inquirer.prompt([
    {
      name: "action",
      message: "What would you like to do?",
      type: "list",
      choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Exit"],
      default: "View All Employees"
    }
  ])
  // Execute desired action or exit.
  switch (userOp.action) {
    case "View All Employees":
      await viewAllEmps();
      break;
    case "Add Employee":
      break;
    case "Update Employee Role":
      break;
    case "View All Roles":
      await viewAllRoles();
      break;
    case "Add Role":
      break;
    case "View All Departments":
      await viewAllDepts();
      break;
    case "Add Department":
      await addDept()
      break;
    default: 
      usingDB = false;
      break;
  }
}

// View All Employees
function viewAllEmps () {
  db.query("SELECT * FROM employees;", (err, results) => {
    if(err) {
      console.log(err)
    } else {
      console.table(results);
    }
  })
}

// Add an Employee

// Update Employee Role.

// View All Roles
function viewAllRoles () {
  db.query("SELECT * FROM roles;", (err, results) => {
    console.table(results);
  })
}

// Add Role

// View All Departments
function viewAllDepts () {
  db.query("SELECT * FROM departments;", (err, results) => {
    console.table(results);
  })
}

// Add Department
async function addDept () {
  // Prompt the user for department name.
  const newDept = await inquirer.prompt([
    {
      name: "deptName",
      message: "Name of new department: ",
      type: "input"
    }
  ]);
  // Construct insert from response.
  await db.execute(`INSERT INTO departments (name) VALUES ("${newDept.deptName}");`, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${newDept.deptName} Added!`)
    }
  })
}

async function init() {
  // While the user has not quit.
  while(usingDB) {
    // Select and execute an action.
    await showMenu();
  }
  // Close the database connection.
  db.end();
}

// Starts app.
init();