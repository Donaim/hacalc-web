
const fs = require("fs");
const path = require("path");

__dirname = process.cwd();

const readStaticFile =
    (function () {
        const static_cache = {};
        return function(filename, encoding, callback) {
            const key = [filename, encoding];
            const existing = static_cache[key];

            if (existing) {
                const [err, data] = existing;
                return callback(err, data);
            }

            function callback0(err, data) {
                static_cache[key] = [err, data];
                callback(err, data);
            }

            fs.readFile(filename, encoding, callback0);
        }
    })();

function serve_static_fn(filename, callback) {
    const fullname = path.normalize(path.join(__dirname, filename));

    if (fullname.startsWith(__dirname)) {
        readStaticFile(fullname, null, callback);
    } else {
        callback('"' + fullname + '" is not subdirectory of "' + __dirname + '"', null);
    }
}

function serve_static(request, response, pathname) {
    function static_callback(err, data) {
        if (err) {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.write("<p>Page not found</p>");
            console.error("Unknown route request = \"" + pathname + "\" (" + err + ")");
        } else {
            const mimetype = pathname.endsWith(".js") ? "text/javascript" : "text/html";
            response.writeHead(200, {"Content-Type": mimetype});
            response.write(data);
        }
        response.end();
    }

    const realPath = pathname === "/" ? "index.html" : pathname;
    return serve_static_fn(realPath, static_callback);
}

function try_handle(request, response, pathname) {
    serve_static(request, response, pathname);
    return true;
}

exports.try_handle = try_handle;

