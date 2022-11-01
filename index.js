// Required Packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

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
      choices: ["View All Employees","Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Exit"],
      default: "View All Employees"
    }
  ])
  // Execute desired action or exit.
  switch (userOp.action) {
    case "View All Employees":
      await viewAllEmps();
      break;
    case "Add Employee":
      await addEmp();
      break;
    case "Update Employee Role":
      await updateEmp();
      break;
    case "View All Roles":
      await viewAllRoles();
      break;
    case "Add Role":
      await addRole();
      break;
    case "View All Departments":
      await viewAllDepts();
      break;
    case "Add Department":
      await addDept()
      break;
    case "Exit": 
      db.end();
      break;
  }
}

// View All Employees
async function viewAllEmps () {
  db.query("SELECT employees.id AS ID, employees.first_name AS Name, roles.title AS Title FROM employees JOIN roles ON employees.role_id = roles.id;", (err, results) => {
    if(err) {
      console.log(err)
    } else {
      console.table(results);
      showMenu();
    }
  })
}

// Add an Employee
async function addEmp () {
  // Prompt the user for new employee info.
  const newEmp = await inquirer.prompt([
    {
      message: "First Name: ",
      type: "input",
      name: "firstName"
    },
    {
      message: "Last Name: ",
      type: "input",
      name: "lastName"
    },
    {
      message: "Employee Role ID: ",
      type: "input",
      name: "empRole"
    },
    {
      message: "Employee Manager ID: ",
      type: "input",
      name: "empMan"
    }
  ]);
  // Construct query from answers, santize.
  db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", [newEmp.firstName, newEmp.lastName, newEmp.empRole, newEmp.empMan], (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${newEmp.firstName} ${newEmp.lastName} has been added!`)
    }
    showMenu();
  })
}

// Update Employee Role.
async function updateEmp () {
  db.query("SELECT employees.id AS ID, employees.first_name AS Name, employees.role_id AS RoleID, roles.title AS Title FROM employees JOIN roles ON employees.role_id = roles.id;", (err, results) => {
    if(err) {
      console.log(err)
    } else {
      console.table(results);
    }
  })
  const newInfo = await inquirer.prompt([
    {
      name: "emp",
      message: "Employee ID: ",
      type: "input"
    },
    {
      name: "newRole",
      message: "Updated Role ID: ",
      type: "input"
    }
  ]);
  db.query("UPDATE employees SET role_id = ? WHERE id = ?", [newInfo.newRole, newInfo.emp], (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.log(results)
    }
    showMenu();
  })
}

// View All Roles
async function viewAllRoles () {
  db.query("SELECT roles.id AS ID, roles.title AS Title, departments.name AS Dept, roles.salary AS Salary FROM roles JOIN departments ON roles.department_id = departments.id;", (err, results) => {
    console.table(results);
    showMenu();
  })
}

// Add Role
async function addRole () {
  db.query("SELECT departments.id AS ID, departments.name AS Dept FROM departments;", (err, results) => {
    console.table(results);
  });
  const newRole = await inquirer.prompt([
    {
      name: "roleName",
      message: "Role Title: ",
      type: "input"
    },
    {
      name: "rolePay",
      message: "Role Salary: ",
      type: "input"
    },
    {
      name: "roleDept",
      message: "Department ID: ",
      type: "input"
    }
  ]);
  db.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);", [newRole.roleName, newRole.rolePay, newRole.roleDept], (err, result) => {
    if (err) {
      console.log(err);
    } else (
      console.log(`${newRole.roleName} added to roles!`)
    )
    showMenu();
  })

}

// View All Departments
async function viewAllDepts () {
  db.query("SELECT departments.id AS ID, departments.name AS Dept FROM departments;", (err, results) => {
    console.log();
    console.table(results);
    showMenu();
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
  db.execute(`INSERT INTO departments (name) VALUES (?);`, [newDept.deptName], (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${newDept.deptName} Added!`)
    }
    showMenu();
  })
}

// Starts app.
showMenu();