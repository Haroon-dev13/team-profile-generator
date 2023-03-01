const questions = [
    {
        type: "list",
        name: "role",
        message: "Please select role.",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
        ],
    },
    {
      type: "input",
      name: "name",
      message: "Please enter the name?",
      validate: name => {
        let accept = name.match(/^[ a-zA-Z\-\’]+$/g);
        if (accept) {
            return true;
        }
        return "Please enter a valid full name";
        },
    },
    {
      type: "input",
      name: "id",
      message: "Please enter Employee ID?",
      validate: id => {
        let accept = id.match(/^[0-9a-zA-Z]+$/g);
        if (accept) {
            return true;
        }
        return "Please enter a valid ID.";
        },
    },
    {
      type: "input",
      name: "email",
      message: "Please enter email address?",
      validate: email => {
        let accept = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (accept.test(email)) {
            return true;
        }

        return "Please enter a valid email.";
        },
    },
    // Manager's question
    {
      type: "input",
      name: "officeNumber",
      message: "Please enter office number?",
      when: answers => {
        return answers.role === "Manager";
        },
      validate: officeNumber => {
        let accept = /^[0-9]+$/;
        if (accept.test(officeNumber)) {
            return true;
        }
        return "Please enter a valid Office Number.";
        },
    },
    // Engineer's question
    {
      type: "input",
      name: "github",
      message: "Please enter github username?",
      when: answers => {
        return answers.role === "Engineer";
        },
        validate: github => {
            let accept = github.match(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i);
            if (accept) {
                return true;
            }
            return "Please enter a valid github username";
        },
    },
    // Intern's question
    {
      type: "input",
      name: "school",
      message: "Please enter school name?",
      when: answers => {
        return answers.role === "Intern";
        },
      validate: school => {
        let accept = school.match(/^[ a-zA-Z\-\’]+$/g);
        if (accept) {
            return true;
        }
        return "Please enter a valid school name";
      }
    },
    // Question if another team member needs to be added
    {
      type: "confirm",
      name: "addTeamMember",
      message: "Add another team member?",
      default: true
    }
];

module.exports = questions;