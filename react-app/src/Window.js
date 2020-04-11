import React, { Component } from 'react';
import ConsoleInput from './ConsoleInput.js'
import HistoryView from './HistoryView.js'

class Window extends Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        console.log('window');

        return (<div>
            <HistoryView key='historyView'/>
            <ConsoleInput key='consoleInput'/>
            </div>
        );
    }
}

export default Window;


