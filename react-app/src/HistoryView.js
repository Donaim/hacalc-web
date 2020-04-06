import React, { Component } from 'react';
import { setInterface } from './Util.js';

class HistoryView extends Component {

    constructor(args) {
        super();
        this.state = {hist: ['hello you','there']};

        const addItem = (input) => {
            console.log('got input: ', input);
            this.setState(state => ({hist: [...state.hist, input]}));
        }

        setInterface('history:add-item', addItem);
    }

    render() {
        return (<div>
            {this.state.hist.map(elem => <p>{elem}</p>)}
        </div>);
    }
}

export default HistoryView;