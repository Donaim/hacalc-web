
const child_process = require('child_process');

const calc_prefix = "/calc/";

function handle(request, response, pathname) {
    const expressionPart = pathname.substring(calc_prefix.length);
    const expressionString = decodeURIComponent(expressionPart);

    function callback(error, stdout, stderr) {
        if (error) {
            console.log('bad input:', error, stdout, stderr);
            response.writeHead(400, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"});
            response.write("Bad input");
        } else {
            response.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"});
            response.write(stdout);
        }
        response.end();
    }
    child_process.execFile('../hacalc-root/run', [expressionString], callback);
}

function try_handle(request, response, pathname) {
    if (pathname.startsWith(calc_prefix)) {
        handle(request, response, pathname);
        return true;
    } else {
        return false;
    }
}

exports.try_handle = try_handle;

