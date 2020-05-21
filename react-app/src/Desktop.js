import React, { Component } from 'react';
import Window from './Window.js';
import { stageInterface, setInterface } from './Util.js';

class Desktop extends Component {

    styles = { display: 'inline-flex',
               marginLeft: 'auto', //alternative to justify-content
               marginRight: 'auto',
               height: '80%',
             };

    constructor(args) {
        super();
        this.state = { windows: [] };
        this.ictx = args.ictx;
        this.id = args.id;

        const createWindow = (state, windowSerializedState) => {
            const ictx = stageInterface(this.ictx);
            const count = state.windows.length;
            const id = this.id + 'DesktopWindow#' + count;
            const window = <Window key={id} id={id} serializedState={windowSerializedState} ictx={ictx}/>;
            return [window, id, ictx];
        }

        this.addWindow = (myId) => (windowSerializedState) => {
            function update(state) {
                const [window, id, ictx] = createWindow(state, windowSerializedState);

                setInterface('desktop:add-window', this.addWindow(id), ictx);

                const removeWindow = () => {
                    function update(state) {
                        const newWindows = state.windows.filter((win) => win.props.id !== id);
                        console.log('removing window: ', id, 'new:', newWindows);
                        return {...state, windows: newWindows };
                    }
                    this.setState(update);
                };
                setInterface('desktop:remove-window', removeWindow, ictx);

                var newWindows;
                if (myId === null) {
                    newWindows = [...state.windows, window];
                } else {
                    newWindows = [];
                    for (const w of state.windows) {
                        newWindows.push(w);
                        if (w.props.id === myId) {
                            newWindows.push(window);
                        }
                    }
                }

                return {...state, windows: newWindows };
            }
            this.setState(update);
        };
    }

    componentDidMount() {
        this.addWindow(null)(null);
    }

    render() {
        return (
                <div style={this.styles}>
                    {this.state.windows}
                </div>
        );
    }
}

export default Desktop;
