const http = require("http");

const server = http.createServer((req, res) => {
    console.log("Requested URL:", req.url);
    console.log(req.headers);
    res.statusCode = 200;
    res.write("<html><head><title>Sample Server Response</title></head><body><h1>Hello, World!</h1><p>(This is an example reponse from the Server)</p></body></html>");
    res.end();
    // the above two lines can be combined into a single line:
    // res.end("<html><head><title>Sample Server Response</title></head><body><h1>Hello, World!</h1><p>(This is an example reponse from the Server)</p></body></html>");
});

server.listen(3000, "localhost", () => {
    console.log("Server running at http://localhost:3000/");
});