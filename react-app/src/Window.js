import React, { Component } from 'react';
import ConsoleInput from './ConsoleInput.js';
import HistoryView from './HistoryView.js';
import { stageInterface } from './Util.js';

class Window extends Component {

    styles = { float: 'left' };

    constructor(args) {
        super();
        this.state = {};
        this.style = args.horizontal ?
            this.horizontalStyle : this.normalStyle;
        this.ictx = stageInterface(args.ictx);
    }

    render() {
        console.log('window');

        return (<div style={this.styles}>
                <HistoryView ictx={this.ictx} />
                <ConsoleInput ictx={this.ictx} />
                </div>
               );
    }
}

export default Window;


