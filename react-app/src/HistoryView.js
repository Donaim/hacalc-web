import React, { Component } from 'react';
import { setInterface, zip, range } from './Util.js';
import HistoryElement from './HistoryElement.js';

class HistoryView extends Component {

    style = { height: '200px',
              maxWidth: '100%',
              overflow: 'hidden',
            };

    dstyle = { maxWidth: '100%',
               height: '100%',
               marginRight: '-100px',
               paddingRight: '100px',
               overflow: 'hidden',
               overflowY: 'auto',
             };

    constructor(args) {
        super();
        this.state = args.initialState || {hist: ['hello you','there']};

        const addItem = (outputs) => {
            this.setState(state => ({hist: [...state.hist, ...outputs]}));
        }

        setInterface('history:add-response', addItem, args.ictx);
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const hist = this.state.hist;
        const indexes = range(hist.length).map(x => this.props.key + 'historyElement#' + x)
        const ziped = zip(hist, indexes);
        const maped = ziped.map(x => <HistoryElement elem={x[0]} key={x[1]} />)
        return (<div style={this.style}>
                <div style={this.dstyle} >
                    {maped}
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
                </div>
                </div>);
    }
}

export default HistoryView;
