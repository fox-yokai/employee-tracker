// --------------------------------------------------------------
// Required Dependencies
// --------------------------------------------------------------
const inquirer = require("inquirer");
const DB = require("./sql");

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
                    "Update employee roles",
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
                    console.log("Add department selected");
                    break
                        
                case "Add role":
                    console.log("Add role selected");
                    break
            
                case "Add employee":
                    console.log("Add employee selected");
                    break
                
                case "Update employee roles":
                    console.log("Update employee roles selected");
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