import React, { Component } from 'react';
import { subscribeInterface, getInterface, getInterfaces, setInterface } from './Util.js';

class InternalsButton extends Component {

    constructor(args) {
        super();

        this.ictx = args.ictx;
        this.id = args.id;

        this.serialize = () => {
            return this.state;
        };

        const deserialize = getInterface('deserialize-state', this.ictx);
        this.state = deserialize() || { text: 'Minimal' };
        subscribeInterface('serialize-state',
                           this.serialize,
                           this.ictx);

        this.nextStateText = (text) => {
            switch (text) {
            case 'Minimal': return 'Internals';
            case 'Internals': return 'Internals*';
            case 'Internals*': return 'Minimal';
            default: throw new Error("Unknonw state: " + text);
            }
        }
        this.cycleState = (state) => {
            return {...state, text: this.nextStateText(state.text)};
        };

        this.getVisibilityMode = () => {
            return this.state.text;
        };
        setInterface('get-visibility-mode', this.getVisibilityMode, this.ictx);

        const updateHists = getInterfaces('history-update', this.ictx, true);
        this.onClick = (e) => {
            this.setState((state) => {
                const newState = this.cycleState(state);
                updateHists(newState.text);
                return newState;
            });
        };
    }

    render() {
        return (<button
                    className="btn btn-primary"
                    tabIndex='-1'
                    onClick={this.onClick}>
                    {this.nextStateText(this.state.text)}
                </button>);
    }
}

export default InternalsButton;
