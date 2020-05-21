import React, { Component } from 'react';
import ConsoleInput from './ConsoleInput.js';
import HistoryView from './HistoryView.js';
import InternalsButton from './InternalsButton.js';
import { getInterface, setInterface } from './Util.js';

function makeButton(text, handler) {
    return <button
            className="btn btn-primary"
            tabIndex='-1'
            onClick={handler}>
                {text}
                </button>
}

class Window extends Component {

    styles = {
        width: '500px',
        float: 'left',
        margin: '20px',
        textAlign: 'left',
        height: '60vh',
    };

    historyStyles = {
        height: '100%',
        overflow: 'hidden',
        overflowY: 'auto',
    };

    constructor(args) {
        super();
        this.state = {};
        this.style = args.horizontal ?
            this.horizontalStyle : this.normalStyle;
        this.ictx = args.ictx;
        this.serializedState = args.serializedState || {};

        this.deserialize = (id) => {
            console.log('deserialize', id, 'from', this.serializedState);
            return this.serializedState[id];
        };
        setInterface('deserialize-state', this.deserialize, this.ictx);

        const addWindow = getInterface('desktop:add-window', this.ictx);
        const serialize = getInterface('serialize-state', this.ictx);

        this.onCloneClick = (e) => {
            const allStates = serialize();
            const serialized = {};
            for (var i = 0; i < allStates.length; i++) {
                var x = allStates[i];
                serialized[x[0]] = x[1];
            }
            addWindow(serialized);
        };
    }

    render() {
        console.log('window');

        return (<div style={this.styles}>
                    <div className="btn-group d-flex" role='group' >
                        {makeButton('Close', null)}
                        <InternalsButton ictx={this.ictx} id={this.id + ':InternalsButton'} />
                        {makeButton('Clone', this.onCloneClick)}
                    </div>
                    <div style={this.historyStyles}>
                        <HistoryView ictx={this.ictx} id={this.id + ':HistoryView'}/>
                        <ConsoleInput ictx={this.ictx} />
                    </div>
                </div>
               );
    }
}

export default Window;


