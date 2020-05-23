import React, { Component } from 'react';
import './App.css';
import Desktop from './Desktop.js';
import { stageInterface, subscribeInterface } from './Util.js';

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

        this.ictx = stageInterface(null);
        this.state = null;
        this.serialize = () => null;
        subscribeInterface('serialize-state',
                           this.serialize,
                           this.ictx);
    }

    render() {
        console.log("rendering app!");
        return (
            <div className="App-header" style={this.styles}>
                <div style={this.innerStyles}>
                    <Desktop ictx={this.ictx} />
                </div>
            </div>
        );
    }
}

export default App;
