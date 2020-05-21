
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

const interfaceRoot = {
    parent: null,
    children: [],
    id: 0,
    depth: 0,
    methods: {},
};

export function setInterface(name, handler, mctx) {
    const ctx = mctx || interfaceRoot;
    console.log('setting', name, 'to interace', mctx, 'that is', ctx);
    ctx.methods[name] = handler;
}

export function subscribeInterface(name, handler, mctx) {
    const ctx = mctx || interfaceRoot;
    const old = ctx.methods[name];
    console.log('substribing', name, 'to interace', mctx, 'that is', ctx);
    if (typeof old == 'function') {
        ctx.methods[name] = [old, handler];
    } else if (old) {
        old.push(handler);
    } else {
        ctx.methods[name] = [handler];
    }
}

export function unsubscribeInterface(name, handler, mctx) {
    const ctx = mctx || interfaceRoot;
    const old = ctx.methods[name];
    console.log('unsubscribing', name, ' to interace', mctx, 'that is', ctx);
    if (typeof old == 'function') {
        ctx.methods[name] = undefined;
    } else if (old) {
        removeItemAll(old, handler);
    }
    // else: not subscribed. That's fine
}

export function getInterface(name, mctx) {
    var ctx = mctx || interfaceRoot;
    var target = undefined;
    return function(...args) {
        if (target === undefined) {
            for (var cur = ctx; cur; cur = cur.parent) {
                const found = cur.methods[name];
                if (found) {
                    if (typeof found == 'function') {
                        target = found;
                    } else { // must be an array
                        target = function (...args) {
                            const ret = Array(found.length);
                            for (var i = 0; i < found.length; i++) {
                                ret[i] = found[i](...args);
                            }
                            return ret;
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
    var ctx = mctx || interfaceRoot;
    const id = ctx.children.length;
    const depth = 1 + ctx.depth;
    const me = {
        parent: ctx,
        children: [],
        id: id,
        depth: depth,
        methods: {},
    };
    ctx.children.push(me);
    return me;
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
