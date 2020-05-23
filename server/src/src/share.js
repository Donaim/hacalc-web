
const fs = require("fs");

const util = require("./util.js");
const postgres = require("./postgres-plug.js");
const prefix = "/share/";

function save(key, body) {
    fs.writeFile(key, body, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

async function handle(request, response, pathname) {
    const key = pathname.substring(prefix.length);
    const body = await util.read_request_body(request);
    console.log(`key: <${key}> body: <${body}>`);

    save(key, body);

    // response.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"});
    // response.write(`key: <${key}> ok`);
    response.end();
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

