import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Desktop from './Desktop.js';

class App extends Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        console.log('main');

        return (
            <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/Window.js</code> and save to reload.
                </p>
                <Desktop />
            </header>
            </div>
        );
    }
}

export default App;
