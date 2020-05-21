
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

export function interfaceGetGlobalId(ctx) {
    const ret = [];
    for (var cur = ctx; cur; cur = cur.parent) {
        ret.push(cur.id);
    }
    return ret;
}

export function interfaceGetRelativeId(base, child, skipCheck) {
    const ret = [];
    var cur = child;
    var baseCur = base;

    while (cur && cur.depth !== base.depth) {
        ret.push(cur.id);
        cur = cur.parent;
    }

    if (!skipCheck) {
        while (cur) {
            if (cur.id !== baseCur.id) {
                return interfaceGetGlobalId(child);
            }
            baseCur = baseCur.parent;
            cur = cur.parent;
        }
    }

    return ret;
}

export function setInterface(name, handler, mctx) {
    const ctx = mctx || interfaceRoot
    console.log('setting', name, 'to interace', mctx, 'that is', ctx);
    for (var cur = ctx; cur; cur = cur.parent) {
        cur.methods[name] = [];
    }
    subscribeInterface(name, handler, mctx);
}

export function subscribeInterface(name, handler, mctx) {
    const ctx = mctx || interfaceRoot
    const me = [mctx, handler];
    for (var cur = ctx; cur; cur = cur.parent) {
        var old = cur.methods[name];
        if (old) {
            old.push(me);
        } else {
            cur.methods[name] = [me];
        }
    }
}

export function unsubscribeInterface(name, handler, mctx) {
    const ctx = mctx || interfaceRoot;
    const me = [mctx, handler];

    console.log('unsubscribing', name, 'from interace', mctx, 'that is', ctx);
    for (var cur = ctx; cur; cur = cur.parent) {
        const old = cur.methods[name];
        if (old) {
            removeItemAll(old, me);
        }
    }
    // else: not subscribed. That's fine
}

export function getInterfaces(name, mctx) {
    var ctx = mctx || interfaceRoot;
    var target = undefined;
    return function(...args) {
        if (target === undefined) {
            for (var cur = ctx; cur; cur = cur.parent) {
                const found = cur.methods[name];
                if (found) {
                    target = function (...args) {
                        const ret = new Array(found.length);
                        for (var i = 0; i < found.length; i++) {
                            const [id, handler] = found[i];
                            ret[i] = [id, handler(...args)];
                        }
                        return ret;
                    }
                    return target(...args, mctx);
                }
            }
            debugger;
            throw new Error('wrong interface name "' + name + '", existing interfaces: [' + Object.keys(ctx.methods) + ']');
        }
        return target(...args, mctx);
    };
}

export function getInterface(name, mctx) {
    const f = getInterfaces(name, mctx);
    return function(...args) {
        const all = f(...args);
        const first = all[0];
        const [id, ret] = first;
        return ret;
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
