INSERT INTO department (dep_name)
VALUES
    ('Sales'),
    ('Marketing'),
    ('IT'),
    ('Finance');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Head of Marketing', 90000, 2),
    ('Social Media Manager', 50000, 2),
    ('Full Stack Engineer', 120000, 3),
    ('Help Desk Support', 60000, 3),
    ('Financial Analyst', 110000, 4),
    ('Accountant', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 2, null),
    ('Mike', 'Chan', 1, 1),
    ('Ashley', 'Rodriguez', 4, null),
    ('Kevin', 'Tupik', 3, 3),
    ('Malia', 'Brown', 6, null),
    ('Sarah', 'Lourd', 5, 5),
    ('Tom', 'Allen', 7, null),
    ('Christian', 'Green', 8, 7);