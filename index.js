const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { title } = require("process");
const { choices } = require("yargs");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
// const manager = new Manager();
console.log("Please enter team managers details:");

function askForGeneralDetails() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the name",
        },
        {
            type: "input",
            name: "id",
            message: "Enter the Id",
        },
        {
            type: "input",
            name: "email",
            message: "Enter the email",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Enter Office number",
        }
      ])
      .then(answers => {
        const manager = new Manager(answers.title, answers.id, answers.email, answers.officeNumber);
        console.log(manager)
        askForOptions();
      });
    }
    askForGeneralDetails();

function quit() {
    console.log("\nGoodbye!");
    process.exit(0);
  }

function askForOptions() {
    inquirer
      .prompt([
        {
            type: "list",
            name: "choice",
            message: "Please select an option.",
            choices: [
                "Add an Engineer",
                "Add an Intern",
                "Quit",
            ],
        },
      ])
      .then(val => {
        if (val.choice === "Add an Engineer") {
          console.log("Eng");
          askForGeneralDetails()
        }
        else if(val.choice == "Add an Intern") {
            console.log("Intern");
        }
        else{
            console.log("Quit");
            quit();
        }
      });
  }

