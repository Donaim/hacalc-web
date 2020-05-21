import React, { Component } from 'react';
import { getInterface } from './Util.js';

class InternalsButton extends Component {

    constructor(args) {
        super();

        this.ictx = args.ictx;
        this.state = args.initialState || { text: 'Internals' };

        this.cycleState = (state) => {
            switch (state.text) {
            case 'Minimal': return {...state, text: 'Internals'};
            case 'Internals': return {...state, text: 'Internals*'};
            case 'Internals*': return {...state, text: 'Minimal'};
            }
        };

        const updateHists = getInterface('history-elements:update', this.ictx);
        this.onClick = (e) => {
            this.setState((state) => {
                updateHists(state.text);
                const newState = this.cycleState(state);
                return newState;
            });
        };
    }

    render() {
        return (<button
                    className="btn btn-primary"
                    tabIndex='-1'
                    onClick={this.onClick}>
                    {this.state.text}
                </button>);
    }
}

export default InternalsButton;
