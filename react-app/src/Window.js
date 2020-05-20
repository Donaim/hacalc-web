import React, { Component } from 'react';
import ConsoleInput from './ConsoleInput.js';
import HistoryView from './HistoryView.js';
import { getInterface } from './Util.js';

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

        const addWindow = getInterface('desktop:add-window', this.ictx);
        const getHistState = getInterface('history:get-state', this.ictx);
        const updateHists = getInterface('history-elements:update', this.ictx);

        this.onCloneClick = (e) => {
            const histState = getHistState();
            addWindow(histState);
        };

        this.onInternalsClick = (e) => {
            console.log("CLICKED"); // DEBUG
            updateHists(true); // DEBUG
        };
    }

    render() {
        console.log('window');

        return (<div style={this.styles}>
                    <div className="btn-group d-flex" role='group' >
                        {makeButton('Close', null)}
                        {makeButton('Internals', this.onInternalsClick)}
                        {makeButton('Clone', this.onCloneClick)}
                    </div>
                    <div style={this.historyStyles}>
                        <HistoryView ictx={this.ictx}
                                     initialState={this.props.initialState}
                                     getStateCallback={this.getHistStateCallback}/>
                        <ConsoleInput ictx={this.ictx} />
                    </div>
                </div>
               );
    }
}

export default Window;


