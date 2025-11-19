const http=require('http');
function step1() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Step 1 done"), 1000);
  });
}

function step2() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Step 2 done"), 1000);
  });
}

function step3() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Step 3 done"), 1000);
  });
}
const server = http.createServer(async (req, res) => {
  if (req.url === "/run") {
    const s1 = await step1();
    const s2 = await step2();
    const s3 = await step3();

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`${s1}\n${s2}\n${s3}`);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Start server
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});