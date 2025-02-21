const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
    console.log("Requested URL:", req.url);
    console.log(req.headers);

    // Set the default file to serve
    let filePath = path.resolve("./public/index.html");

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("File not found!");
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html");
            res.end("<h1>404 Not Found</h1><p>The requested file was not found on this server.</p>");
            return;
        }

        // If accessible, read and serve the file
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");

        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    });
});

server.listen(3000, "localhost", () => {
    console.log("Server running at http://localhost:3000/");
});