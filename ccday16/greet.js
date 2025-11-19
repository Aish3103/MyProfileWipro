const name = process.argv[2] || 'Stranger';

const now = new Date();
const formatted = now.toLocaleString('en-US', {
weekday: 'short',
month: 'short',
day: 'numeric',
year: 'numeric',
hour: 'numeric',
minute: '2-digit'
});


console.log(`Hello, ${name}! Today is ${formatted}`);