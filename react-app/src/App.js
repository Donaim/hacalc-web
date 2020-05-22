import React, { Component } from 'react';
import './App.css';
import Desktop from './Desktop.js';

class App extends Component {

    styles = { height: '90vh',
             };

    innerStyles = { marginTop: 'auto',
                    marginBottom: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: '90%',
                  };

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="App-header" style={this.styles}>
                <div style={this.innerStyles}>
                    <p> Edit <code>src/Window.js</code> and save to reload. </p>
                    <Desktop />
                </div>
            </div>
        );
    }
}

export default App;
