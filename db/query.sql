-- SELECT employees.id AS ID, employees.first_name AS Name, roles.title AS Title FROM employees JOIN roles ON employees.role_id = roles.id;

-- SELECT roles.id AS ID, roles.title AS Title, departments.name AS Dept, roles.salary AS Salary FROM roles JOIN departments ON roles.department_id = departments.id;


-- Every column named in my select statement will constituten the new table.
SELECT a.id AS ID, a.first_name AS First, a.last_name AS Last, roles.title AS Title, roles.salary AS Salary, departments.name AS Dept, b.first_name AS Manager FROM employees a LEFT JOIN roles ON a.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees b ON a.manager_id = b.id;
