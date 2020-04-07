
// process.chdir('src')
__dirname = process.cwd();

const fs = require("fs");
const http = require("http");
const url = require("url");
const path = require("path");

function serve_static(filename, callback) {
    function callback0(err, data) {
        if (err) {
            const fullname = path.join(__dirname, filename);
            fs.readFile(fullname, "utf8", callback)
        } else {
            callback(err, data);
        }
    }
    fs.readFile(filename, "utf8", callback0);
}

function start_router() {
    var server = http.createServer(function (request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        response.writeHead(200, {"Content-Type": "text/html"});

        function static_callback(err, data) {
            if (err) {
                // response.writeHead(404, {"Content-Type": "text/html"});
                // response.write("<p>Page not found</p>");
                console.error("Unknown route request = \"" + pathname + "\" (" + err + ")");
            } else {
                // response.writeHead(200, {"Content-Type": "text/html"});
                response.write(data);
            }
            response.end();
        }

        const realPath = pathname === "/" ? "index.html" : pathname;
        return serve_static(realPath, static_callback);
    });

    var port = process.env.PORT || 1337;
    server.listen(port);

    // console.log("Listening to server on 1337...");
}

function start() {
    start_router();
}

start();