console.log('Node.js version:', process.version);
console.log('Current file:', __filename);
console.log('Current directory:', __dirname);


let count = 0;
const interval = setInterval(() => {
console.log(new Date().toLocaleTimeString() + ' — Welcome to Node.js!');
count += 3; // we'll track seconds elapsed (interval of 3s)
}, 3000);


setTimeout(() => {
clearInterval(interval);
console.log('Stopped the welcome timer after 10 seconds.');
}, 10000);

