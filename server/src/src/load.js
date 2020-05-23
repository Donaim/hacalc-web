
const fs = require("fs");

const util = require("./util.js");
const postgres = require("./postgres-plug.js");
const prefix = "/load/";

function restore(key) {
    return new Promise((resolve, reject) => {
        function callback(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        }
        fs.readFile(key, callback);
    });
}

async function handle(request, response, pathname) {
    const key = pathname.substring(prefix.length);

    try {
        const content = await restore(key);
        console.log('got:', content);
        response.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"});
        response.write(content);
        response.end();
    } catch {
        response.writeHead(400, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"});
        response.write('bad key');
        response.end();
    }
}

function try_handle(request, response, pathname) {
    if (pathname.startsWith(prefix)) {
        handle(request, response, pathname);
        return true;
    } else {
        return false;
    }
}

exports.try_handle = try_handle;

