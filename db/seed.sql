INSERT INTO department (name)
VALUES ("Kitchen"),
       ("Frontend"),
       ("Legal Team"),
       ("Advertisement"),
       ("Quality Control");

INSERT INTO role (title, salary, department_id)
VALUES ("Head Chef", 80000, 1),
       ("Sous Chef", 60000, 1),
       ("Line Cook", 50000, 1),
       ("Waiter/Waitress", 50000, 2),
       ("Bartender", 60000, 2),
       ("Janitor", 40000, 2),
       ("Lawyer", 110000, 3),
       ("PR Worker", 55000, 4),
       ("Advertising Executive", 90000, 4),
       ("Taste Tester", 60000, 5),
       ("QA Lead", 75000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lorenzio", "Rodriguez", 1, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jeffery", "Banthem", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Monica", "Sturvenkiz", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("George", "Paplion", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Daniel", "Martinez", 11, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Roger", "Valoor", 4, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lisa", "Keriea", 5, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rebecca", "Laminov", 10, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Silver", 7, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Levesky", 9, NULL);
