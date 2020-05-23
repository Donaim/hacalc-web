
process.chdir('public');
__dirname = process.cwd();

const http = require("http");
const url = require("url");

const util = require("./src/util.js");
const calc = require("./src/calc.js");
const stat = require("./src/static.js");
const share = require("./src/share.js");
const load = require("./src/load.js");

// const lol = require("./postgresql/postgres-plug.js");

// async function kek() {
//     const errors = await lol.try_connect();
//     console.log('result:', errors);
// }

// kek();

function serverCallback(request, response) {
    const method = request.method;
    const pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    false
        || calc.try_handle(request, response, pathname)
        || load.try_handle(request, response, pathname)
        || share.try_handle(request, response, pathname)
        || stat.try_handle(request, response, pathname)
        ;
}

const server = http.createServer(serverCallback);
const port = process.env.PORT || 1337;
server.listen(port);

