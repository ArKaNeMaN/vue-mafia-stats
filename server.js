const http = require("http");
const fs = require("fs");

const PORT = 8080;
const WORKDIR = '/dist';
const INDEXFILE = 'index.html';
const SIMPLE = true;

const mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "svg": "image/svg+xml",
    "json": "application/json",
    "js": "text/javascript",
    "css": "text/css"
};

function getFilePath(path) {
    return process.cwd() + WORKDIR + path;
}

http.createServer(function (request, response) {
    const uri = request.url;
    let filename = getFilePath(uri);

    if (SIMPLE && !fs.existsSync(filename)) {
        filename = getFilePath('/');
    }

    if (fs.statSync(filename).isDirectory()) {
        filename += INDEXFILE;
    }

    fs.readFile(filename, "binary", function (err, file) {
        if (err) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end();
            return;
        }

        let mimeType = mimeTypes[filename.split('.').pop()];

        if (!mimeType) {
            mimeType = 'text/plain';
        }

        response.writeHead(200, {"Content-Type": mimeType});
        response.write(file, "binary");
        response.end();
    });
}).listen(PORT);

console.log(`Static file server running at \n\t=> http://localhost:${PORT}/ \nCTRL + C to shutdown`);