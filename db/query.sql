SELECT employees.first_name AS Name, roles.title
FROM employees
JOIN roles ON employees.role_id = roles.id;