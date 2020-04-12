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
        return (
                <div>
                <Window />
                <Window />
                <Window />
                </div>
        );
    }
}

export default Desktop;
