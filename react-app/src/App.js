import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Window from './Window.js'

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
                <Window />
            </header>
            </div>
        );
    }
}

export default App;
