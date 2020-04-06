
const globalInterfacesList = {};

export function setInterface(name, handler) {
    globalInterfacesList[name] = handler;
}

export function getInterface(name) {
    const handler = globalInterfacesList[name];
    if (handler) {
        return handler;
    } else {
        throw ('wrong interface name "' + name + '"');
    }
}
