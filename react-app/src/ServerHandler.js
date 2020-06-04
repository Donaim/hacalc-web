
import { setInterface, json_stringify_circular, json_parse_circular } from './Util.js';

function isInternal(line) {
    return line.includes('$');
}

const SERVER_ADDRESS = 'http://127.0.0.1:1337';

function serverHandlerSend(request, callback) {
    const encoded = encodeURIComponent(request);
    fetch(SERVER_ADDRESS + '/calc/' + encoded).then(response => {
        response.text().then(text => {
            const lines = text.split('\n');
            const maped = lines.map(line => line.trim()).map(line => line.startsWith('->') ? line.substring(2).trim() : '');
            const filtered = maped.filter(line => line !== '');
            const decorated = filtered.map(line =>
                ({ text: line,
                   isResponse: true,
                   isInternal: isInternal(line),
                   isFinal: false,
                 }));
            if (decorated.length === 0) {
                const nonEmpty = lines.filter(line => line !== '');
                decorated.push({ text: nonEmpty[nonEmpty.length - 1], isResponse: true });
            }

            const last = decorated[decorated.length - 1];
            last.isFinal = true;
            last.isInternal = false;

            const original = { text: request, isResponse: false };
            const ret = [original, ...decorated];
            callback(ret);
        });
    });
}

const serverHandlerShare = (function () {
    return function (state) {
        const s = json_stringify_circular(state);
        const key = 'cc1337cc'; // TODO: use hash
        const parameters = {
            method: 'POST',
            redirect: 'follow',
            mode: 'no-cors',
            headers: {
                "Content-Type": "plain/text",
                "Access-Control-Allow-Origin": "*",
            },
            body: s,
        };

        function callback(response) {
            console.log('response:', response);
        }

        fetch(SERVER_ADDRESS + '/share/' + key, parameters).then(callback)

        return s;
    }
}());

function serverHandlerLoad() {
    function cbacked(resolve, reject) {
        const key = 'cc1337cc';

        function callback_text(text) {
            const obj = json_parse_circular(text);
            resolve(obj);
        }
        function callback(response) {
            response.text().then(callback_text);
        }

        fetch(SERVER_ADDRESS + '/load/' + key).then(callback);
    }

    return new Promise(cbacked);
}

export function serverHandlerInit() {
    setInterface('serverHandler:send', serverHandlerSend);
    setInterface('share', serverHandlerShare);
    setInterface('load', serverHandlerLoad);
}

