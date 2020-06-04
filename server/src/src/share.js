
const fs = require("fs");

const util = require("./util.js");
const postgres = require("./postgres-plug.js");
const prefix = "/share/";

const save =
      function () {
          var client = undefined;
          return async function(key, body) {
              if (client == undefined) {
                  client = await postgres.initialize_client();
              }

              const response = await postgres.save_key_value(client, key, body)
                    .catch(err => console.log('share error', err));
          };
      }();

async function handle(request, response, pathname) {
    const key = pathname.substring(prefix.length);
    const body = await util.read_request_body(request);

    try {
        save(key, body);
        response.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"});
    } catch {
        response.writeHead(400, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"});
    } finally {
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

