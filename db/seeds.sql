INSERT INTO department (name)
VALUES
    ('Computers'),
    ('Home Entertainment'),
    ('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Manager', 100000, 1), 
    ('Supervisor', 80000, 2), 
    ('Associate', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Charles', 'Anderson', 1, 1),
    ('Rodrigo', 'Gallo', 2, 1),
    ('Kevin', 'Norman', 3, null);
