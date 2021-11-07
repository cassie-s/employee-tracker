// Required modules
const figlet = require('figlet');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

// mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'company'
});

connection.connect(err => {
    if (err) throw err;
    afterConnection();
});

// Fancy ASCII welcome art and prompt initialization
afterConnection = () => {
    figlet('Employee', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir (err);
            return;
        }
        console.log('------------------------------------------------')
        console.log(data);
    })
    figlet('Manager', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir (err);
            return;
        }
        console.log(data)
        console.log('------------------------------------------------')
        promptUser();
    })
};

// Begin inquirer prompts
const promptUser = () => {
    return inquirer.prompt ([
      {
        type: 'list',
        name: 'choices',
        message: "What would you like to do?",
        choices: [
            'View all departments',
            'View all positions',
            'View all employees',
            'Add a department',
            'Add a position',
            'Add an employee',
            'Update an employee position',
            'Update an employee manager',
            'View employees by department',
            'Delete a department',
            'Delete a position',
            'Delete a position',
            'Delete an employee',
            'View department budgets',
            'No Action']
      }
    ])
        .then((answers) => {
            const { choices } = answers;

            if (choices === 'View all departments') {
                showDepartments();
            }
            if (choices === "View all positions") {
                showPositions();
            }
            if (choices === 'View all employees') {
                showEmployees();
            }
            if (choices === 'Add a department') {
                addDepartment();
            }
            if (choices === 'Add a position') {
                addPosition();
            }
            if (choices === 'Add an employee') {
                addEmployee();
            }
            if (choices === 'Update an employee position') {
                updateEmployee();
            }
            if (choices === 'Update an employee manager') {
                updateManager();
            }
            if (choices === 'View employees by department') {
                employeeDepartment();
            }
            if (choices === 'Delete a department') {
                deleteDepartment();
            }
            if (choices === 'Delete an employee') {
                deleteEmployee();
            }
            if (choices === 'View department budgets') {
                viewBudget();
            }
            if (choices === 'No Action') {
                connection.end()
            };
        });
    };
        
showDepartments = () => {
    console.log('Showing all departments...\n');
    var query = `SELECT department.id, department.dep_name AS department FROM department`;

    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
        
        promptUser();
    })
};

showPositions = () => {
    console.log('Showing all positions...\n');
    var query = `SELECT position.id, position.title AS positions, department.dep_name as department
                FROM position
                INNER JOIN department ON position.department_id = department.id`;

    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);

        promptUser();
    })
};

showEmployees = () => {
    console.log('Showing all employees...\n');
    var query = `SELECT employee.id, 
                employee.first_name, 
                employee.last_name, 
                position.title, 
                department.dep_name AS department,
                position.salary, 
                CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employee
                LEFT JOIN position ON employee.position_id = position.id
                LEFT JOIN department ON position.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);

        promptUser();
    })
};

addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: 'What department do you want to add?',
            validate: addDept => {
                if (addDept) {
                    return true;
                } else {
                    console.log('Please enter a department!');
                    return false;
                }
            }
        }
    ])
        .then(answer => {
            var query = `INSERT INTO department (dep_name)
                        VALUES (?)`;
            connection.query(query, answer.addDept, (err, result) => {
                if (err) throw err;
                console.log('Added ' + answer.addDept + ' to departments!')

                showDepartments();
            });
        });
    };

addPosition = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addPos',
            message: 'What position do you want to add?',
            validate: addPos => {
                if (addPos) {
                    return true;
                } else {
                    console.log('Please enter a position!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'addSalary',
            message: 'What is the salary of this role?',
            validate: addSalary => {
                if (addSalary) {
                    return true;
                } else {
                    console.log('Please enter a salary!');
                }
            }
        },
        {
              type: 'list', 
              name: 'addDept',
              message: "What department is this role in?",
              choices: [
                    1,
                    2,
                    3,
                    4
              ]
            }
        ])
            .then(answer => {
                const params = [answer.addPos, answer.addSalary, answer.addDept];
                var query = `INSERT INTO position (title, salary, department_id)
                            VALUES (?, ?, ?)`;
                connection.query(query, params, (err, result) => {
                    if (err) throw err;
                    console.log('Added position!')
    
                    showPositions();
                });
            });
        };
    