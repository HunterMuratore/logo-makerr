const inquirer = require('inquirer');
const colors = require('colors');
const fs = require('fs');
const generateSVG = require('./utils/generateSVG');
const validColors = require('./colors.json');

const questions = [
    {
        name: 'text',
        message: 'Enter up to three characters you would like to use for the logo:'.cyan,
        validate: validateText
    },
    {
        name: 'color',
        message: 'Enter a color keyword or a 6 digit hexadecimal number for the text (or try a \'random\' color):'.cyan,
        validate: validateColor
    },
    {
        name: 'shape',
        type: 'list',
        choices: ['Circle', 'Triangle', 'Square'],
        message: 'Please select a shape'.cyan
    },
    {
        name: 'shapeColor',
        message: 'Enter a color keyword or a 6 digit hexadecimal number for the shape (or try a \'random\' color):'.cyan,
        validate: validateColor
    }
];

function init() {
    inquirer.prompt(questions).then((answers) => {
        writeToFile(answers.text, generateSVG(answers));
    });
}

function writeToFile(fileName, data) {
    fs.writeFile(`./${fileName}_logo.svg`, data, (err) => {
        if (err) throw err;
    
        console.log('Logo created successfully!');
    });
}

function validateText(input) {
    if (input.length > 0 && input.length <= 3) {
        return true;
    }
    
    return 'Text must be between 0 and 3 characters - try again'.brightRed;
}

function validateColor(input) {
    if (validColors.includes(input.toLowerCase())) {
        return true;
    } else if (input.length == 6 && /^[0-9A-Fa-f]+$/.test(input)) {
        return true;
    } else if (input.toLowerCase() === 'random') {
        return true;
    }
    
    return 'Must enter a color keyword (i.e. Red) or a valid 6 digit hexadecimal number (i.e. #a1b2c3) - try again'.brightRed;
}

init();
