// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const { generateMarkdown } = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input

function validateInput(value) {
    if (value != "") {
        return true;
    } else {
        return "Please answer the question with some kind on input.";
    }
}
const questions = () => {
    return inquirer.prompt([{
        type: "input",
        name: "title",
        message: "Plesase enter a title for the  project (Required)?",
        validate: validateInput,
    },
    // Question for the project Description
    {
        type: "input",
        name: "description",
        message: "Please enter a description of your project.",
        validate: validateInput,
    },
    {
        type: "input",
        name: "installation",
        message: "Please enter an explanation how to install the software, or commands for the program.",
        validate: validateInput,
    },

    {
        type: "input",
        name: "usage",
        message: "Please describe how we can use this project.",
        validate: validateInput,
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'What are the contribution guidelines for your project?'
    },
    {
        type: 'input',
        name: 'test',
        message: 'What are the test instruction for your project?'
    },
    {
        type: "input",
        name: "username",
        message: "What is your GitHub username?",
        validate: validateInput,
    },

    {
        type: "input",
        name: "email",
        message: "What is your GitHub email address that contributors may contact?",
        validate: function (value) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                return true;
            } else {
                return "Not a valid email address. Please enter a valid email address.";
            }
        },
    },
    {
        type: 'list',
        name: 'license',
        message: 'What is the license of your project?',
        choices: ['MIT', 'ISC', 'GNU LGPL', 'Unlicense', 'none'],
        default: 'MIT'
    }])
    .then(input => {
        return input;
    })
};

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if(err) throw err;
        console.log('README has been created!')
    })
}

// TODO: Create a function to initialize app
function init() {
    questions() // Prompt user to get input data
        .then(input => {
            return generateMarkdown(input);
        })
        .then(markdown => {
            writeToFile('./output/README.md', markdown);
        })
        .catch(err => {
            console.log(err);
        })
}

// Function call to initialize app
init()

