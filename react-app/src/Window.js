import React, { Component } from 'react';
import ConsoleInput from './ConsoleInput.js';
import HistoryView from './HistoryView.js';
import { getInterface } from './Util.js';

class Window extends Component {

    styles = {
        float: 'left',
        margin: '20px',
        border: '2px solid black',
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

        this.onClickHandler = (e) => {
            const histState = getHistState();
            addWindow(histState);
        };
    }

    render() {
        console.log('window');

        return (<div style={this.styles}>
                    <div className="btn-group d-flex" role='group' >
                        <button className="btn btn-primary">Apple</button>
                        <button className="btn btn-primary">Samsung</button>
                        <button className="btn btn-primary">Sony</button>
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


