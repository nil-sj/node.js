const http = require("http");

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Received a GET request\n');
    } else {
        res.statusCode = 405;
        res.end('Method Not Allowed\n');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});