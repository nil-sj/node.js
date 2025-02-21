const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);
   
    if (req.method === 'GET') {
        let fileUrl = req.url;
        if (fileUrl === "/") {
            fileUrl = "index.html";
        }

        const filePath = path.resolve('./public/' + fileUrl);
        const fileExt = path.extname(filePath);

        if (fileExt === ".html") {
            fs.access(filePath, (err) => {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "text/html");
                    res.end(`<html><body><h1>Error 404</h1><p>${fileUrl} not found!</p></body></html>`);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html");
            res.end(`<html><body><h1>Error 404</h1><p>${fileUrl} is not an HTML file.</p></body></html>`)
        }
    } else {
        res.statusCode = 405;
        res.setHeader("Content-Type", "text/html");
        res.end(`<html><body><h1>Error 405</h1><p>${req.method} not supported</p></body></html>`);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});