import React, { Component } from 'react';
import Window from './Window.js';
import { stageInterface, setInterface } from './Util.js';

class Desktop extends Component {

    constructor(args) {
        super();
        this.state = { windows: [] };
        this.ictx = args.ictx;

        this.addWindow = (windowInitialState) => {
            console.log('adding new window with state: ', windowInitialState);

            function update(state) {
                const count = state.windows.length;
                const key = 'DesktopWindow#' + count;
                const ictx = stageInterface(this.ictx);
                const window = <Window key={key} initialState={windowInitialState} ictx={ictx}/>
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
                <div>
                    {this.state.windows}
                </div>
        );
    }
}

export default Desktop;
