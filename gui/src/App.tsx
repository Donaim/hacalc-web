import React, { Component } from 'react';
import './App.css';
import Desktop from './Desktop';
import Intro from './Intro';
import { stageInterface, subscribeInterface } from './Util';

class App extends Component {

    styles = { height: '90vh' };

    innerStyles = { marginTop: 'auto',
                    marginBottom: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    height: '90%',
                  };

    ictx : any;
    state;
    serialize;

    constructor(props) {
        super(props);

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
                <Intro />
                <div style={this.innerStyles}>
                    <Desktop ictx={this.ictx} />
                </div>
            </div>
        );
    }
}

export default App;
