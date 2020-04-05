// --------------------------------------------------------------
// Required Dependencies
// --------------------------------------------------------------
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const connection = require("../server");

// --------------------------------------------------------------
// Menu Prompts
// --------------------------------------------------------------
class CliMenu {
    start() {
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
              console.log("View departments selected");
              break
            
          case "View roles":
              console.log("View roles selected");
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

    viewDepartments() {
        console.log("Now viewing all departments...");
        
    }


}

module.exports = new CliMenu();