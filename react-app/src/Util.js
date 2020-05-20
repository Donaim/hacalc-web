
function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
        if(arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}

const globalInterfacesList = [{}];

export function setInterface(name, handler, mctx) {
    const ctx = mctx || globalInterfacesList;
    const first = ctx[0];
    console.log('setting', name, 'to interace', mctx, 'that is', ctx);
    first[name] = handler;
}

export function subscribeInterface(name, handler, mctx) {
    const ctx = mctx || globalInterfacesList;
    const first = ctx[0];
    const old = first[name];
    console.log('substribing', name, 'to interace', mctx, 'that is', ctx);
    if (typeof old == 'function') {
        first[name] = [old, handler];
    } else if (old) {
        old.push(handler);
    } else {
        first[name] = handler;
    }
}

export function unsubscribeInterface(name, handler, mctx) {
    const ctx = mctx || globalInterfacesList;
    const first = ctx[0];
    const old = first[name];
    console.log('unsubscribing', name, ' to interace', mctx, 'that is', ctx);
    if (typeof old == 'function') {
        first[name] = undefined;
    } else if (old) {
        removeItemAll(old, handler);
    }
    // else: not subscribed. That's fine
}

export function getInterface(name, mctx) {
    const ctx = mctx || globalInterfacesList;
    var target = undefined;
    return function(...args) {
        if (target === undefined) {
            for (var i = 0; i < ctx.length; i++) {
                const cur = ctx[i];
                const found = cur[name];
                if (found) {
                    if (typeof found == 'function') {
                        target = found;
                    } else { // must be an array
                        target = function (...args) {
                            for (var i = 0; i < found.length; i++) {
                                found[i](...args);
                            }
                        }
                    }
                    return target(...args);
                }
            }
            throw new Error('wrong interface name "' + name + '", existing interfaces: ' + Object.keys(ctx));
        }
        return target(...args);
    };
}

export function stageInterface(mctx) {
    var ctx = mctx || globalInterfacesList;
    return [{}, ...ctx];
}

export function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
}

export function zipMany(arrays) {
    return arrays[0].map(function(_,i){
        return arrays.map(function(array){return array[i]})
    });
}

export function zip(a, b) {
    return zipMany([a, b]);
}
