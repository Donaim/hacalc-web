import React, { Component } from 'react';

class HistoryView extends Component {

    constructor(args) {
        super();
        this.state = {hist: ['hello you','there']};

        this.inputHandler = (input) => {
            console.log('got input: ', input);
            this.setState(state => ({hist: [...state.hist, input]}));
        };

        this.handleMessage = (m) => {
            switch (m.type) {
                case 'addItem':
                    return this.inputHandler(m.value);
                default:
                    throw ('bad message type: ' + m.type)
            }
        };
    }

    render() {
        return (<div>
            {this.state.hist.map(elem => <p>{elem}</p>)}
        </div>);
    }
}

export default HistoryView;