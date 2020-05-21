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

        this.addWindow = (windowSerializedState) => {
            console.log('adding new window with state: ', windowSerializedState);

            function update(state) {
                const count = state.windows.length;
                const key = 'DesktopWindow#' + count;
                const ictx = stageInterface(this.ictx);
                const window = <Window key={key} serializedState={windowSerializedState} ictx={ictx}/>
                const newWindows = [...state.windows, window];
                return { windows: newWindows };
            }
            this.setState(update);
        };

        setInterface('desktop:add-window', this.addWindow, this.ictx);
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
