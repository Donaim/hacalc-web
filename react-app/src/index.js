import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

import { serverHandlerInit } from './ServerHandler.js';
import { setInterface, getInterfaces, interfaceGetGlobalId } from './Util.js';

serverHandlerInit();

var global_deserialize_state = {};

function global_deserialize(ctx) {
    const id = interfaceGetGlobalId(ctx);
    console.log('deserializing', id);
    return global_deserialize_state[id];
}
setInterface('deserialize-state', global_deserialize, null);

const serialize = getInterfaces('serialize-state', null);
var lock = false;
function myself() { return lock; }
function global_serialize() {
    if (lock) { return myself; }
    lock = true;
    const allStates = serialize();
    lock = false;
    const serialized = {};
    for (var i = 0; i < allStates.length; i++) {
        const [ctx, response] = allStates[i];
        if (response !== myself) {
            const id = interfaceGetGlobalId(ctx);
            serialized[id] = response;
        }
    }
    return serialized;
}
setInterface('serialize-state', global_serialize, null);

function show() {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

show();

