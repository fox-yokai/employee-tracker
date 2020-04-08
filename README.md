# employee-tracker
Small command-line interface to track employees.
Using this application you will be able to:
- Add employees
- Add roles
- Add departments
- View any of the above
- Update employee names, roles, managers, and departments
## Dependencies 
- Inqurier
- mysql
## How to use the project
- Download the files
- Install the dependencies using  ```NPM install```
- start the application by running ``` node server.js``` from the terminal
- user arrow keys to navigate
## Code Highlights
```
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
```