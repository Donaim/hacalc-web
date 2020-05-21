import React, { Component } from 'react';
import { subscribeInterface, getInterface } from './Util.js';

class InternalsButton extends Component {

    constructor(args) {
        super();

        this.ictx = args.ictx;
        this.id = args.id;

        this.serialize = () => {
            return [this.id, this.state];
        };

        const deserialize = getInterface('deserialize-state', this.ictx);
        this.state = deserialize(this.id) || { text: 'Internals' };
        subscribeInterface('serialize-state',
                           this.serialize,
                           this.ictx);

        this.cycleState = (state) => {
            switch (state.text) {
            case 'Minimal': return {...state, text: 'Internals'};
            case 'Internals': return {...state, text: 'Internals*'};
            case 'Internals*': return {...state, text: 'Minimal'};
            }
        };

        subscribeInterface('history-elements:update', (...args) => null, this.ictx);
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
