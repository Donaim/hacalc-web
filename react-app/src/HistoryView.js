import React, { Component } from 'react';
import { stageInterface, setInterface, getInterface, subscribeInterface, zip, range } from './Util.js';
import HistoryElement from './HistoryElement.js';

class HistoryView extends Component {

    constructor(args) {
        super();
        this.ictx = args.ictx;
        this.id = args.id;
        this.loadId = args.loadId;

        this.serialize = () => this.state;

        const deserialize = getInterface('deserialize-state', this.ictx);
        this.state = deserialize() || { hist: [] };
        subscribeInterface('serialize-state',
                           this.serialize,
                           this.ictx);

        const addItem = (outputs) => {
            this.setState(state => ({hist: [...state.hist, ...outputs]}));
        }
        setInterface('history-add-response', addItem, this.ictx);
    }

    scrollToBottom = (smooth) => {
        const beh = smooth ? "smooth" : "auto";
        this.messagesEnd.scrollIntoView({ behavior: beh });
    }
    componentDidUpdate() {
        this.scrollToBottom(true);
    }
    componentDidMount() {
        this.scrollToBottom(false);
    }

    render() {
        const hist = this.state.hist;
        const indexes = range(hist.length).map(x => this.id + 'historyElement#' + x)
        const ziped = zip(hist, indexes);
        const maped = ziped.map(x => <HistoryElement ictx={stageInterface(this.ictx)} elem={x[0]} id={x[1]} key={x[1]} />)
        return (<div>
                    {maped}
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
                </div>);
    }
}

export default HistoryView;
