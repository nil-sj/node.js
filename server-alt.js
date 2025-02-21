const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`Requested URL is: ${req.url}`);

    // Ensure the request URL does not access outside the public folder
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);


    // Or at least apply some other security as shown belo:
        // Normalize to remove any malicious '../' patterns
        // filePath = path.normalize(filePath);

        // Restrict access strictly within 'public' directory
        // if (!filePath.startsWith(path.join(__dirname, 'public'))) {
        //     res.writeHead(403, { 'Content-Type': 'text/html' });
        //     return res.end('<h1>403 Forbidden</h1><p>Access Denied</p>', 'utf-8');
        // }

    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
        default:
            contentType = 'text/html';
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000/');
});