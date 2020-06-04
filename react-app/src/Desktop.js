import React, { Component } from 'react';
import Window from './Window.js';
import { stageInterface, getInterface, subscribeInterface } from './Util.js';

class Desktop extends Component {

    styles = { display: 'inline-flex',
               height: '90%',
             };

    constructor(args) {
        super();
        this.ictx = args.ictx;
        this.id = args.id;
        this.mounted = false;

        this.state = { count: 0, indexes: [] };
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

            subscribeInterface('add-window', this.addWindow(count), ictx);

            const removeWindow = () => {
                const newWindows = this.windows.filter((win) => win.count !== count);
                console.log('removing window: ', window.id, 'new:', newWindows);
                this.windows = newWindows;
                this.setState(s => ({ ...s, indexes: s.indexes.filter(i => i !== count)}));
            };
            subscribeInterface('remove-window', removeWindow, ictx);

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
