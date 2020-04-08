// --------------------------------------------------------------
// Required Dependencies
// --------------------------------------------------------------
const connection = require("../connection");
const inquirer = require("inquirer");


// --------------------------------------------------------------
// Functions that interact with the database
// --------------------------------------------------------------

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
        return inquirer
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
        return inquirer
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
    
    addEmployee() {
        return inquirer
        .prompt([
            {
            type: "input",
            message: "Enter the user's first name",
            name: "first_name",
            },
            {
            type: "input",
            message: "Enter the user's last name",
            name: "last_name",
            },
            {
            type: "input",
            message: "Enter the user's role ID",
            name: "role_id",
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
            message: "Enter the user's manager ID number",
            name: "manager_id",
            validate: function(manager_id) {
                let pass = manager_id.match(/^[0-9]*$/);
                if (pass) {
                    return true;
                } else {
                    return "Please enter a valid department ID number";
                }
                }
            }
        ]).then(function ({ first_name, last_name, role_id, manager_id }) {
            connection.query(
                "INSERT INTO employee SET ?", 
                {
                    first_name: first_name,
                    last_name: last_name,
                    role_id: role_id,
                    manager_id: manager_id
                },
                 function (err, res) {
                    if (err) throw err;
                 })
        })
    };
    updateEmployeeInfo() {
        return inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the employee number you wish to update",
                name: "id",
                validate: function(id) {
                    let pass = id.match(/^[0-9]*$/);
                    if (pass) {
                        return true;
                    } else {
                        return "Please enter a valid number";
                    }
                    }
            },
            {
                type: "list",
                message: "Select which catergory to change",
                name: "category",
                choices: ["First name", "Last name", "Role", "Manager"]
            },
            {
                type: "input",
                message: "Enter the employee's updated first name",
                name: "first_name",
                when: function( answers ) {
                    return answers.category === "First name";
                }
            },
            {
                type: "input",
                message: "Enter the employee's updated last name",
                name: "last_name",
                when: function( answers ) {
                    return answers.category === "Last name";
                }
            },
            {
                type: "input",
                message: "Enter the employee's updated role ID",
                name: "role_id",
                when: function( answers ) {
                    return answers.category === "Role";
                }
            },
            {
                type: "input",
                message: "Enter the employee's updated manager ID",
                name: "manager_id",
                when: function( answers ) {
                    return answers.category === "Manager";
                }
            }
        ]).then(function({ category, id, first_name, last_name, role_id, manager_id }) {
            switch(category) {
                case "First name":
                    connection.query(
                        "UPDATE employee SET ? WHERE ?",
                        [
                            {
                                first_name: first_name 
                            },
                            {
                                id: id
                            }]
                    )
                    break
                case "Last name":
                    connection.query(
                        "UPDATE employee SET ? WHERE ?",
                        [
                            {
                                last_name: last_name 
                            },
                            {
                                id: id
                            }]
                    )
                    break
                case "Role":
                    connection.query(
                        "UPDATE employee SET ? WHERE ?",
                        [
                            {
                                role_id: role_id
                            },
                            {
                                id: id
                            }]
                    )
                    break
                case "Manager":
                    connection.query(
                        "UPDATE employee SET ? WHERE ?",
                        [
                            {
                                manager_id: manager_id 
                            },
                            {
                                id: id
                            }]
                    )
                    break
            }
        })
    }
}


module.exports = new DB(connection);