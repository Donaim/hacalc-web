
import { setInterface } from './Util.js';

function serverHandlerSend(request, callback) {
    fetch('http://127.0.0.1:1337/calc/' + request).then(response => {
        response.text().then(text => {
            callback(text);
        });
    });
}

export function serverHandlerInit() {
    setInterface('serverHandler:send', serverHandlerSend);
}

