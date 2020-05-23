import React, { Component } from 'react';
import Window from './Window.js';
import { stageInterface, getInterface, getInterfaces, subscribeInterface, interfaceGetRelativeId } from './Util.js';

class Desktop extends Component {

    styles = { display: 'inline-flex',
               height: '90%',
             };

    constructor(args) {
        super();
        this.ictx = args.ictx;
        this.id = args.id;
        this.mounted = false;

        const deserializeI = getInterface('deserialize-state', this.ictx);
        const deser = deserializeI();
        this.state = (deser && deser.me) || { count: 0, indexes: [] };
        this.serializedState = deser || { me: this.state, down: {} };

        const serialize = getInterfaces('serialize-state', this.ictx);

        var lock = false;
        function myself() { return lock; }
        this.serializeThis = () => {
            if (lock) { return myself; }
            lock = true;
            const allStates = serialize();
            lock = false;
            const serialized = {};
            for (var i = 0; i < allStates.length; i++) {
                const [ctx, response] = allStates[i];
                if (response !== myself) {
                    const id = interfaceGetRelativeId(this.ictx, ctx);
                    serialized[id] = response;
                }
            }
            return { me: this.state, down: serialized };
        };
        subscribeInterface('serialize-state',
                           this.serializeThis,
                           this.ictx);

        this.deserialize = (ctx) => {
            const id = interfaceGetRelativeId(this.ictx, ctx);
            console.log('deserialize', ctx, 'id:', id, 'from', this.serializedState);
            return this.serializedState.down[id];
        };
        subscribeInterface('deserialize-state', this.deserialize, this.ictx);

        this.windows = [];

        this.initWindow = (parentCount, count) => (windowSerializedState) => {
            const id = this.id + 'DesktopWindow#' + count;
            const window = {
                serializedState: windowSerializedState,
                id: id,
                key: id,
                count: count};
            const ictx = stageInterface(this.ictx);
            window.ictx = ictx;

            subscribeInterface('desktop:add-window', this.addWindow(count), ictx);

            const removeWindow = () => {
                const newWindows = this.windows.filter((win) => win.count !== count);
                console.log('removing window: ', window.id, 'new:', newWindows);
                this.windows = newWindows;
                this.setState(s => ({ ...s, indexes: s.indexes.filter(i => i !== count)}));
            };
            subscribeInterface('desktop:remove-window', removeWindow, ictx);

            var newWindows;
            if (parentCount === null) {
                newWindows = [...this.windows, window];
            } else {
                newWindows = [];
                for (const w of this.windows) {
                    newWindows.push(w);
                    if (w.count === parentCount) {
                        newWindows.push(window);
                    }
                }
            }

            console.log('parentcount:', parentCount, 'count:', count);
            // console.log('before indexes:', state.indexes, 'windows', this.windows);

            this.windows = newWindows;
        };

        this.addWindow = (parentCount) => (windowSerializedState) => {
            var repeat = null;
            var count = undefined;
            const update = (state) => {
                if (repeat === null) {
                    repeat = true;
                    count = state.count + 1;
                    this.initWindow(parentCount, count)(windowSerializedState);
                }
                return { count: count, indexes: [ ...state.indexes, [parentCount, count] ] };
            }
            if (this.mounted) {
                this.setState(update);
            } else {
                this.state = update(this.state);
            }
        };

        async function finish_init(me) {
            if (me.state.count === 0) {
                var st;
                const loc = window.location;
                if (loc.pathname.startsWith('/load/')) {
                    const load = getInterface('load');
                    st = await load();
                    console.log('loading from state:', st);
                } else {
                    st = null;
                }

                me.addWindow(null)(st);
            } else {
                for (const i of me.state.indexes) {
                    const [ parentCount, count ] = i;
                    me.initWindow(parentCount, count)(null);
                }
            }
        }
        finish_init(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    render() {
        const mapper = (w) => {
            return <Window key={w.id} id={w.id} serializedState={w.serializedState} ictx={w.ictx}/>;
        };
        const windows = this.windows.map(mapper);
        return (
                <div style={this.styles}>
                    {windows}
                </div>
        );
    }
}

export default Desktop;
