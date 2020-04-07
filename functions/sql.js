// --------------------------------------------------------------
// Required Dependencies
// --------------------------------------------------------------
const connection = require("../connection");



class DB {
    constructor(connection) {
        this.connection = connection;
    }
// Add department
     viewDepartments() {
    console.log("Now viewing all departments...");
    return this.connection.query(
        "SELECT * FROM department"
        );
    };

    viewRoles() {
        console.log("Now viewing all roles...");
        return this.connection.query(
            "SELECT * FROM role LEFT JOIN department ON role.department_id = department.id"
        );
    }
}


// Add role

// Add employee

// View department

// View roles

// View employees

// Update employee role

// Bonus functions
    // Update employee managers

    // View employees by manager

    // Delete departments

    // Delete roles

    // Delete employees

    // View total budget by department



module.exports = new DB(connection);