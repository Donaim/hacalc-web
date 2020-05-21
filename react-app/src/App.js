import React, { Component } from 'react';
import './App.css';
import Desktop from './Desktop.js';

class App extends Component {

    styles = { height: '90vh',
             };

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="App-header" style={this.styles}>
                <p> Edit <code>src/Window.js</code> and save to reload. </p>
                <Desktop />
            </div>
        );
    }
}

export default App;
