import React, { Component } from 'react';
import Window from './Window.js';
import { stageInterface, setInterface } from './Util.js';

class Desktop extends Component {

    styles = { display: 'inline-flex',
             };

    constructor(args) {
        super();
        this.state = { windows: [] };
        this.ictx = args.ictx;
        this.id = args.id;

        this.addWindow = (windowSerializedState) => {
            console.log('adding new window with state: ', windowSerializedState);

            function update(state) {
                const ictx = stageInterface(this.ictx);
                const count = state.windows.length;
                const key = this.id + 'DesktopWindow#' + count;
                // const window = <Window key={key} serializedState={windowSerializedState} ictx={ictx}/>

                setInterface('desktop:add-window', this.addWindow, ictx);

                this.removeWindow = () => {
                    function update(state) {
                        const newWindows = state.windows.filter((win) => win.props.id !== key);
                        console.log('removing window: ', key, 'new:', newWindows);
                        return {...state, windows: newWindows };
                    }
                    this.setState(update);
                };
                setInterface('desktop:remove-window', this.removeWindow, ictx);

                const window = <Window key={key} id={key} serializedState={windowSerializedState} ictx={ictx}/>
                const newWindows = [...state.windows, window];
                return {...state, windows: newWindows };
            }
            this.setState(update);
        };
    }

    componentDidMount() {
        this.addWindow(null);
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
