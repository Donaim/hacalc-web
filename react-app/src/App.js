import React, { Component, createRef } from 'react';
import logo from './logo.svg';
import './App.css';
import ConsoleInput from './ConsoleInput.js'
import HistoryView from './HistoryView.js'

class App extends Component {

    constructor() {
        super();
        this.state = {};
        this.historyViewRef = createRef();

        this.handleMessage = (m) => {
            throw 'dont handle messages';
        };
    }

    render() {
        return (
            <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/App.js</code> and save to reload.
                </p>
                <HistoryView ref={this.historyViewRef}/>
                <ConsoleInput historyViewRef={this.historyViewRef}/>
            </header>
            </div>
        );
    }
}

export default App;
