-- Seed departments
INSERT INTO departments (name) VALUES
("Sales"),
("Legal"),
("Development");

-- Seed roles
INSERT INTO roles (title, salary, department_id) VALUES
-- Sales Roles
("Sales Lead", 90000, 1),
("Sales Associate", 65000, 1),
-- Legal Roles
("Legal Lead", 140000, 2),
("Lawyer", 105000, 2),
-- Development Roles
("Project Manager", 150000, 3),
("Frontend Dev", 90000, 3),
("Backend Dev", 105000, 3);

-- Seed employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
-- Sales
("Vessin", "Whispervale", 1, NULL),
("Rakurai", "Progeny", 2, 1),
("Onedohr", "First", 2, 1),
-- Legal
("Amelia", "Osborn", 3, NULL),
("Rhodan", "Fordrone", 4, 4),
("Ben", "Tenison", 4, 4),
-- Development
("Iboh", "of the Wheel", 5, NULL),
("Potts", "Pottington", 6, 7),
("Skylar", "Karman", 6, 7),
("Joe", "Dixon", 7, 7),
("Cooper", "Sankey", 7, 7),
("Bleu", "Perez", 7, 7);


SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;