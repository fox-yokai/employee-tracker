DROP DATABASE IF EXISTS cms_DB;

CREATE DATABASE cms_DB;

USE cms_DB;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO department (id, name)
VALUES (1, "Executive"), (2, "Legal"), (3, "Sales"), (4, "Production"), (5, "IT");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Executive Officer", 250000, 1), (2, "Legal Services Director", 100000, 2), (3, "Sales Director", 125000, 3), (4, "Process Control Technician", 55000, 4), (5, "Service Desk Specialist", 47000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Abigal", "Anderson", 1, NULL), ("Bob", "Bergstrom", 2, 1), ("Cindy", "Carlson", 3, 1);