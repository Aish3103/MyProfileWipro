const figlet = require('figlet');
const chalk = require('chalk');


const text = figlet.textSync('Welcome to Node.js', { horizontalLayout: 'default' });
console.log(chalk.green.bold(text));