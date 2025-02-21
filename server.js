const http = require("http");

const server = http.createServer((req, res) => {
    console.log("Requested URL:", req.url);
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<html><head><title>Sample Server Response</title></head><body><h1>Hello, World!</h1><p>(This is an example reponse from the Server)</p></body></html>");
});

server.listen(3000, "localhost", () => {
    console.log("Server running at http://localhost:3000/");
});