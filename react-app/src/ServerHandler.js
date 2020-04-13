
import { setInterface } from './Util.js';

function serverHandlerSend(request, callback) {
    fetch('http://127.0.0.1:1337/calc/' + request).then(response => {
        response.text().then(text => {
            const lines = text.split('\n');
            const maped = lines.map(line => line.trim()).map(line => line.startsWith('->') ? line.substring(2).trim() : '');
            const filtered = maped.filter(line => line !== '');
            const decorated = filtered.map(line => ({ text: line, isResponse: true }));
            if (decorated.length === 0) {
                const nonEmpty = lines.filter(line => line !== '');
                decorated.push({ text: nonEmpty[nonEmpty.length - 1], isResponse: true });
            }
            const original = { text: request, isResponse: false };
            const ret = [original, ...decorated];
            callback(ret);
        });
    });
}

export function serverHandlerInit() {
    setInterface('serverHandler:send', serverHandlerSend);
}

