const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const questions = require('./lib/questions');
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMembers = [];



async function addTeamMember() {
    try {

        // Prompts user with questions defined in questions.js and wait for the user to answer
        const answers = await inquirer.prompt(questions);

         // Destructure the answers object to obtain the necessary information to create a new team member
        const { name, id, email, role } = answers;

         // Check the role of the team member being added and create relevant object
        switch(role) {
            case "Manager":
                const manager = new Manager(name, id, email, answers.officeNumber);
                teamMembers.push(manager);
                break;
            case "Engineer":
                const engineer = new Engineer(name, id, email, answers.github);
                teamMembers.push(engineer);
                break;
            case "Intern":
                const intern = new Intern(name, id, email, answers.school);
                teamMembers.push(intern);
                break;
        }
         // Check if the user wants to add another team member or render the HTML
        if (answers.addTeamMember) {
            await addTeamMember();
        } else {
            renderData();
        }
    } catch(err) {
        console.log(err);
    }
}


function renderData() {

    // Check if OUTPUT_DIR directory exists. If it doesn't, create it.
    fs.existsSync(OUTPUT_DIR) ? null : fs.mkdirSync(OUTPUT_DIR);

    // Generate the HTML content based on the teamMembers array.
    const html = render(teamMembers);

    // Write the HTML content to the specified outputPath file.
    fs.writeFile(outputPath, html, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log(`html has been successfully generated at ${outputPath}`);
        }
    });
}

addTeamMember();


function quit() {
    console.log("\nGoodbye!");
    process.exit(0);
  }
