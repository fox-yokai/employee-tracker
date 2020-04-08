// --------------------------------------------------------------
// Required Dependencies
// --------------------------------------------------------------
const inquirer = require("inquirer");
const DB = require("./sql");

// --------------------------------------------------------------
// This is the command line interface function
// --------------------------------------------------------------

function startCli() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "start",
                message: "What would you like to do?",
                choices: [
                    "View departments",
                    "View roles",
                    "View employees",
                    "Add department",
                    "Add role",
                    "Add employee",
                    "Update employee information",
                    "Exit the program" 
                ]
            }
        ])
        .then(function({ start }) {
            switch(start) {
                case "View departments":
                    DB.viewDepartments()
                    .then(function (res){
                    console.log("\n");
                    console.table(res);
                    })
                    .then(function() {
                        startCli();
                    })
                    break
                    
                case "View roles":
                    DB.viewRoles()
                    .then(function (res){
                    console.table(res);
                    })
                    .then(function() {
                        startCli();
                    })
                    break

                case "View employees":
                    DB.viewEmployees()
                    .then(function (res){
                    console.table(res);
                    })
                    .then(function() {
                        startCli();
                    })
                    break
                
                case "Add department":
                    DB.addDepartment()
                    .then(function (){
                        startCli();
                    })
                    break
                        
                case "Add role":
                    DB.addRole()
                    .then(function (){
                        startCli();
                    })
                    break
            
                case "Add employee":
                    DB.addEmployee()
                    .then(function (){
                        startCli();
                    })
                    break
                
                case "Update employee information":
                    DB.updateEmployeeInfo()
                    .then(function (){
                        console.log("Employee infomation updated!\n")
                        startCli();
                    })
                    break
                        
                case "Exit the program":
                    process.exit();
            }
        })
        .catch(error => {
            throw error;
        });
            };

startCli();