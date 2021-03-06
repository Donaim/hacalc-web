
const Base64 = require('js-base64');

function read_request_body_cb(request) {
    let body = [];
    return function(callback) {
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            callback(body)
        });
    }
}

function read_request_body(request) {
    return new Promise(read_request_body_cb(request));
}

exports.read_request_body = read_request_body;
exports.read_request_body_cb = read_request_body_cb;
exports.encode64 = Base64.encode;
exports.decode64 = Base64.decode;

