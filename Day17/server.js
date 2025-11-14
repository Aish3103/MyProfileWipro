// server.js

const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  const url = req.url;

  // Route Handling
  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to Node.js Server!");
  } 
  
  else if (url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is a simple about page created using Node.js.");
  } 
  
  else if (url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Contact us at: contact@example.com");
  } 
  
  else {
    // 404 for any other route
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
