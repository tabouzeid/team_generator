const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

function generateEmployeeInfo(){
    inquirer.prompt([
        {
            message: "How many Managers in your team?",
            name: "numOfManagers",
            type: "number"
        },
        {
            message: "How many Interns in your team?",
            name: "numOfInterns",
            type: "number"
        },
        {
            message: "How many Engineers in your team?",
            name: "numOfEngineers",
            type: "number"
        }
    ]).then(answers => {
        createEmployeeInfo([], answers);
    });
}

function  createEmployeeInfo(employeeInfo, numOfEmployees){
    if (employeeInfo.length < numOfEmployees.numOfManagers){
        createManager(employeeInfo, numOfEmployees);
    } else if (employeeInfo.length < (numOfEmployees.numOfManagers + numOfEmployees.numOfInterns)) {
        createIntern(employeeInfo, numOfEmployees);
    } else if (employeeInfo.length < (numOfEmployees.numOfManagers + numOfEmployees.numOfInterns + numOfEmployees.numOfEngineers)) {
        createEngineer(employeeInfo, numOfEmployees);
    } else {
        let html =  render(employeeInfo);
        fs.mkdir("output", function(err) {
            // if (err) throw err;
        });
        fs.writeFile("output/team.html", html, function(err) {
            if (err) throw err;
        });
    }
}

function createManager(employeeInfo, numOfEmployees){
    inquirer.prompt([
        {
            message: "What is this Manager's name?",
            name: "name",
            type: "input"
        },
        {
            message: "What is this Manager's email?",
            name: "email",
            type: "input"
        },
        {
            message: "What is this Manager's office number?",
            name: "officeNumber",
            type: "input"
        },
    ]).then(answers => {
        employeeInfo.push(new Manager(answers.name, employeeInfo.length, answers.email, answers.officeNumber));
        createEmployeeInfo(employeeInfo, numOfEmployees);
    });
}

function createIntern(employeeInfo, numOfEmployees){
    inquirer.prompt([
        {
            message: "What is this Intern's name?",
            name: "name",
            type: "input"
        },
        {
            message: "What is this Intern's email?",
            name: "email",
            type: "input"
        },
        {
            message: "What is this Intern's school?",
            name: "email",
            type: "input"
        },
    ]).then(answers => {
        employeeInfo.push(new Intern(answers.name, employeeInfo.length, answers.email, answers.school));
        createEmployeeInfo(employeeInfo, numOfEmployees);
    });
}

function createEngineer(employeeInfo, numOfEmployees){
    inquirer.prompt([
        {
            message: "What is this Engineer's name?",
            name: "name",
            type: "input"
        },
        {
            message: "What is this Engineer's email?",
            name: "email",
            type: "input"
        },
        {
            message: "What is this Engineer's github username?",
            name: "email",
            type: "input"
        },
    ]).then(answers => {
        employeeInfo.push(new Engineer(answers.name, employeeInfo.length, answers.email, answers.github));
        createEmployeeInfo(employeeInfo, numOfEmployees);
    });
}

generateEmployeeInfo();