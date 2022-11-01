-- SELECT employees.id AS ID, employees.first_name AS Name, roles.title AS Title FROM employees JOIN roles ON employees.role_id = roles.id;

-- SELECT roles.id AS ID, roles.title AS Title, departments.name AS Dept, roles.salary AS Salary FROM roles JOIN departments ON roles.department_id = departments.id;

SELECT employees.id AS ID, 
employees.first_name AS First, 
employees.last_name AS Last, 
roles.title AS Title, 
departments.name AS Dept, 
roles.salary AS Salary, 
employees.first_name AS Manager 
FROM employees 
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id;