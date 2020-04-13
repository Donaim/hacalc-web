import React, { Component } from 'react';
import Window from './Window.js';
import { stageInterface } from './Util.js';

class Desktop extends Component {

    constructor(args) {
        super();
        this.state = { windows: [] };
        this.ictx = stageInterface(args.ictx);

        this.addWindow = (windowInitialState) => {
            function update(state) {
                const count = state.windows.length;
                const key = 'DesktopWindow#' + count;
                const window = <Window key={key} initialState={windowInitialState}/>
                const newWindows = [...state.windows, window];
                return { windows: newWindows };
            }
            this.setState(update);
        };
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
