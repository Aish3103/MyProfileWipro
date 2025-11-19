// this will be the entry point for your application where we will parse JSON bodies, calling global logging middleware and displaying server running message along with port no
const express = require('express');
const app = express();
const port = 3000;
const logger = require('./middleware/logger');
const bodyParser = require('body-parser');
const students=require("./routes/students");

console.log("Path resolved:", require.resolve("./routes/students"));

// Middleware to parse JSON bodies
app.use(bodyParser.json()); 
// Global logging middleware
app.use(logger);    
// Sample route with modular routing
app.use('/students', students);
// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});