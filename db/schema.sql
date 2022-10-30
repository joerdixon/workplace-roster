DROP DATABASE IF EXISTS roster_db;

-- Initiallize database.
CREATE DATABASE roster_db;

-- Stage Database.
USE roster_db;

-- Define department table.
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, 
    name VARCHAR(30) NOT NULL
);
DESCRIBE departments;

-- Define role table.
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE CASCADE
);
DESCRIBE roles;

-- Define employee table.
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT REFERENCES employees(id),
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
);

DESCRIBE employees;