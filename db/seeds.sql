INSERT INTO department(name)
VALUES ('Sales'),
('Marketing'),
('Accounting'),
('RnD'),
('Legal'),
('Executive');

INSERT INTO role(title, salary, department_id)
VALUES ('Salesperson', 60000, 1),
('Sales Manager', 90000, 1),
('Director of Marketing', 110000, 2),
('Accountant', 90000, 3),
('Engineer', 90000, 4),
('Senior Engineer', 130000, 4),
('Lawyer', 140000, 5),
('CFO', 400000, 6),
('CEO', 600000, 6);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Andrew', 'H', 9, null),
('Alec', 'L', 8, 1),
('Chris', 'B', 6, 1),
('Geoffrey', 'C', 2, 2);
