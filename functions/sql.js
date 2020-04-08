// --------------------------------------------------------------
// Required Dependencies
// --------------------------------------------------------------
const connection = require("../connection");
const inquirer = require("inquirer");



class DB {
    constructor(connection) {
        this.connection = connection;
    }
     viewDepartments() {
    console.log("Now viewing all departments...\n");
    return this.connection.query(
        "SELECT * FROM department"
        );
    };

    viewRoles() {
        console.log("Now viewing all roles...\n");
        return this.connection.query(
            "SELECT * FROM role LEFT JOIN department ON role.department_id = department.id"
        );
    };

    viewEmployees() {
        console.log("Now viewing all employees...\n");
        return this.connection.query(
            "SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id"
        )
    };

    addDepartment() {
        inquirer
            .prompt([
                {
                type: "input",
                message: "What is the name of the department?",
                name: "deptName"
                },
                {
                type: "input",
                message: "Enter the department ID number",
                name: "deptID",
                validate: function(deptID) {
                    let pass = deptID.match(/^[0-9]*$/);
                    if (pass) {
                        return true;
                    } else {
                        return "Please enter a valid department ID number";
                    }
                    }
                },
            ]).then(function ({ deptName, deptID }) {
                connection.query(
                    "INSERT INTO department SET ?", 
                    {
                        id: deptID,
                        name: deptName
                    },
                     function (err, res) {
                        if (err) throw err;
                     })
            });
    };

    addRole() {
        inquirer
        .prompt([
            {
            type: "input",
            message: "Enter the ID number of the role",
            name: "roleID",
            validate: function(roleID) {
                let pass = roleID.match(/^[0-9]*$/);
                if (pass) {
                    return true;
                } else {
                    return "Please enter a valid role ID number";
                }
                }
            },
            {
            type: "input",
            message: "Enter the title of the role",
            name: "roleTitle",
            },
            {
            type: "input",
            message: "Enter the salary",
            name: "roleSalary",
            validate: function(roleSalary) {
                let pass = roleSalary.match(/^[0-9]*$/);
                if (pass) {
                    return true;
                } else {
                    return "Please enter a valid number";
                }
                }
            },
            {
            type: "input",
            message: "Enter the Department ID number",
            name: "deptID",
            validate: function(deptID) {
                let pass = deptID.match(/^[0-9]*$/);
                if (pass) {
                    return true;
                } else {
                    return "Please enter a valid department ID number";
                }
                }
            }
        ]).then(function ({ roleID, roleTitle, roleSalary, deptID }) {
            connection.query(
                "INSERT INTO role SET ?", 
                {
                    id: roleID,
                    title: roleTitle,
                    salary: roleSalary,
                    department_id: deptID
                },
                 function (err, res) {
                    if (err) throw err;
                 })
        })
    };
    
}

// Add employee

// Update employee role

// Bonus functions
    // Update employee managers

    // View employees by manager

    // Delete departments

    // Delete roles

    // Delete employees

    // View total budget by department



module.exports = new DB(connection);