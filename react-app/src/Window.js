import React, { Component } from 'react';
import ConsoleInput from './ConsoleInput.js'
import HistoryView from './HistoryView.js'

class Window extends Component {

    horizontalStyle = { float: 'left' };
    normalStyle = {};

    constructor(args) {
        super();
        this.state = {};
        this.style = args.horizontal ?
            this.horizontalStyle : this.normalStyle;
    }

    render() {
        console.log('window');
        console.log('mastyle =', this.style);

        return (<div style={this.style}>
                <HistoryView />
                <ConsoleInput />
                </div>
               );
    }
}

export default Window;


