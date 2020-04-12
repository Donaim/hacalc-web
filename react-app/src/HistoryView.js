import React, { Component } from 'react';
import { setInterface, zip, range } from './Util.js';
import HistoryElement from './HistoryElement.js';

class HistoryView extends Component {

    style = { height: '200px', overflow: 'hidden', overflowY: 'scroll' };

    constructor(args) {
        super();
        this.state = {hist: ['hello you','there']};

        const addItem = (input) => {
            console.log('got input: ', input);
            this.setState(state => ({hist: [...state.hist, input]}));
        }

        setInterface('history:add-item', addItem, args.ictx);
    }

    render() {
        const hist = this.state.hist;
        const indexes = range(hist.length).map(x => 'historyElement#' + x)
        const ziped = zip(hist, indexes);
        const maped = ziped.map(x => <HistoryElement elem={x[0]} key={x[1]} />)
        return (<nav style={this.style} > {maped} </nav>);
    }
}

export default HistoryView;
