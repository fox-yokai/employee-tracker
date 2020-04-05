// --------------------------------------------------------------
// Required Dependencies
// --------------------------------------------------------------
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

// --------------------------------------------------------------
// Load Data
// --------------------------------------------------------------
const CliMenu = require("./functions/cli.js");

// --------------------------------------------------------------
// Connect to SQL Server
// --------------------------------------------------------------
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "foxes4ever&ever",
    database: "cms_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(`connected as id${connection.threadId}\n`);
    CliMenu.start();
})