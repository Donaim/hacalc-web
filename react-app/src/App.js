import React, { Component } from 'react';
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
            <div>
            <header className="App-header">
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
