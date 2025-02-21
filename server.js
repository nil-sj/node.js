const http = require("http");

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log("Requested URL:", req.url);
    console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});