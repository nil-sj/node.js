# Node.js Backend Development Guide

## **1. Introduction to Web Development**
Web applications consist of two main parts:
- **Front-End (Client-Side)**: Uses **HTML, CSS, and JavaScript** to present content and interactivity to users.
- **Back-End (Server-Side)**: Handles business logic, database interactions, and serves responses to client requests.

## **2. What is Node.js?**
**Node.js** is a runtime environment that enables running JavaScript on the server-side.  
Key features:
- **V8 Engine**: Uses Google Chrome's V8 engine for fast execution.
- **Non-blocking I/O**: Uses event-driven, asynchronous programming.
- **Single-threaded**: Efficiently handles multiple concurrent requests.

## **3. Setting Up Node.js**
### **Check Installation**
```sh
node -v   # Check Node.js version
npm -v    # Check npm (Node Package Manager) version
```

### **Running a JavaScript File**
```sh
node filename.js
```

### **Using Node.js REPL**
Start interactive JavaScript execution:
```sh
node
```
Exit with:
```sh
.exit
```

## **4. Creating a Simple HTTP Server**
```js
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello, World!</h1></body></html>');
});

server.listen(3000, 'localhost', () => {
    console.log('Server running at http://localhost:3000/');
});
```
Run the server and visit **http://localhost:3000/**.

## **5. Node.js Core Modules**
### **Important Modules**
| Module   | Description |
|----------|-------------|
| `http`   | Handles HTTP requests & responses |
| `fs`     | Reads/writes files |
| `path`   | Works with file paths |
| `url`    | Parses URLs |
| `os`     | Provides OS-related utilities |

### **Example: Serving an HTML File**
```js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'index.html');

fs.readFile(filePath, (err, data) => {
    if (err) {
        console.error("File not found!");
        return;
    }
    console.log("File read successfully.");
});
```

## **6. NPM (Node Package Manager)**
### **Initialize a Node.js Project**
```sh
npm init -y  # Create a package.json file
```

### **Installing Packages**
```sh
npm install express  # Install Express.js
```
To use an installed package:
```js
const express = require('express');
```

## **7. Handling HTTP Methods**
### **Handle Only GET Requests**
```js
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Received a GET request');
    } else {
        res.writeHead(405);
        res.end('Method Not Allowed');
    }
});

server.listen(3000, () => console.log('Server running...'));
```

## **8. Serving Static Files**
### **Create a Static Server**
```js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    // Normalize the path to prevent directory traversal attacks
    filePath = path.normalize(filePath);
    if (!filePath.startsWith(path.join(__dirname, 'public'))) {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        return res.end('<h1>403 Forbidden</h1><p>Access Denied</p>', 'utf-8');
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': contentType = 'image/jpg'; break;
        case '.ico': contentType = 'image/x-icon'; break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(3000, () => console.log('Server running on port 3000'));
```

## **9. Node.js Event Loop**
Node.js uses an **event-driven, non-blocking model** for asynchronous programming.

### **Example: Event Loop Execution**
```js
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);
setImmediate(() => console.log("Immediate"));

console.log("End");

// Output: Start, End, Immediate, Timeout
```

## **10. Error Handling in Node.js**
### **Callback-Based Error Handling**
```js
fs.readFile('nonexistent.txt', (err, data) => {
    if (err) {
        console.error('Error reading file:', err.message);
        return;
    }
    console.log(data);
});
```

### **Using Try-Catch for Async/Await**
```js
const fs = require('fs').promises;

async function readFileAsync() {
    try {
        const data = await fs.readFile('example.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error('Error:', err.message);
    }
}
readFileAsync();
```

## **11. Summary**
- **Node.js** is a fast, event-driven runtime for JavaScript.
- **Core modules**: `http`, `fs`, `path`, etc.
- **NPM**: Manages packages (`npm install <package>`).
- **Asynchronous programming**: Uses callbacks, promises, and async/await.
- **Handling HTTP requests**: With the `http` module or frameworks like Express.js.

## **12. Next Steps**
- Learn **Express.js** for building APIs.
- Explore **MongoDB with Mongoose** for database interactions.
- Learn **JWT authentication** for secure user sessions.

---

This **README.md** provides a structured and practical guide for working with **Node.js** 🚀. Let me know if you want any refinements! 📌
