import React, { Component } from 'react';
import Window from './Window.js';
import { stageInterface } from './Util.js';

class Desktop extends Component {

    constructor(args) {
        super();
        this.state = { windows: [<Window />, <Window />],
                     };
        this.ictx = stageInterface(args.ictx);
    }

    render() {
        const st = {hist: []};
        return (
                <div>
                <Window initialState={st}/>
                <Window />
                <Window />
                </div>
        );
    }
}

export default Desktop;
