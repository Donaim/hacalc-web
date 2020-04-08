
import { setInterface } from './Util.js';

function serverHandlerSend(request) {
    fetch('http://127.0.0.1:1337/calc/' + request).then(response => {
       response.text().then(text => {
           console.log('text: ', text);
       })
    });
}

export function serverHandlerInit() {
    setInterface('serverHandler:send', serverHandlerSend);
}

