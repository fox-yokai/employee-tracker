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
    }

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
               return this.connection.query(
                    "INSERT INTO department (id, name) SET ?", ('deptId', 'deptName'), function (err, result) {
                        if (err) throw err;
                    }
                )
            }).catch((error) => {
                assert.isNotOk(error,'Promise error');
                done();
            });
    }
}


// Add role

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