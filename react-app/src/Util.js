
const globalInterfacesList = {};

export function setInterface(name, handler) {
    globalInterfacesList[name] = handler;
}

export function getInterface(name) {
    var target = undefined;
    return function(...args) {
        if (!target) {
            target = globalInterfacesList[name];
            if (!target) {
                throw new Error('wrong interface name "' + name + '"');
            }
        }
        return target(...args);
    };
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
