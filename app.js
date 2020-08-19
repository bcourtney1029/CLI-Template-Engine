const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const fullTeam = [];

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee position would you like to add?",
                choices: ["manager","engineer","intern"],
                name: "employeeType"
            }

        ])
        .then(response => {
            console.log(response);
            switch (response.employeeType) {
                case "manager":
                    createManager();
                    break;
                
                case "engineer":
                    createEngineer(); 
                    break;

                case "intern":
                    createIntern();
                    break;
            }     
        })
}

function createManager() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the manager's name?",
                name: "managerName"
            },
            {
                type: "input",
                message: "What is the manager's id?",
                name: "managerId"
            },
            {
                type: "input",
                message: "What is the manager's email?",
                name: "managerEmail"
            },
            {
                type: "input",
                message: "What is the manager's office number?",
                name: "officeNumber"
            }
        ])
        .then(response => {
            const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.officeNumber);
            fullTeam.push(manager);
            anotherMember();
        })
}

function createEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the engineer's name?",
                name: "engineerName"
            },
            {
                type: "input",
                message: "What is the engineer's id?",
                name: "engineerId"
            },
            {
                type: "input",
                message: "What is the engineer's email?",
                name: "engineerEmail"
            },
            {
                type: "input",
                message: "What is the engineer's GitHub username?",
                name: "githubUsername"
            }
        ])
        .then(response => {
            const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.githubUsername);
            fullTeam.push(engineer);
            anotherMember();
        })
}

function createIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the intern's name?",
                name: "internName"
            },
            {
                type: "input",
                message: "What is the intern's id?",
                name: "internId"
            },
            {
                type: "input",
                message: "What is the intern's email?",
                name: "internEmail"
            },
            {
                type: "input",
                message: "What is the intern's school?",
                name: "internSchool"
            }
        ])
        .then(response => {
            const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
            fullTeam.push(intern);
            anotherMember();
        })
}

function anotherMember() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "another",
                message: "Would you like to add another team member?",
                choices: ["Yes","No"]
            }
        ])
        .then(response => {
            if (response.another == "Yes") {
                addEmployee();
            } 
            else if (response.another == "No") {
                let finishedTeam = render(fullTeam);
                let html = "test.html";
                fs.writeFile(path.resolve(OUTPUT_DIR, html), finishedTeam, "utf8", () => console.log("File written!"));
            }
            else {
                anotherMember();
            }
        })
}


module.exports = fullTeam;


addEmployee();
 