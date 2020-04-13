import React, { Component } from 'react';
import ConsoleInput from './ConsoleInput.js';
import HistoryView from './HistoryView.js';
import { getInterface } from './Util.js';

class Window extends Component {

    styles = { float: 'left', margin: '20px', border: '2px solid black', textAlign: 'left' };

    constructor(args) {
        super();
        this.state = {};
        this.style = args.horizontal ?
            this.horizontalStyle : this.normalStyle;
        this.ictx = args.ictx;

        const addWindow = getInterface('desktop:add-window', this.ictx);

        this.onClickHandler = (e) => {
            const histState = this.getHistState();
            addWindow(histState);
        };

        this.getHistState = undefined;
        this.getHistStateCallback = (callback) => {
            this.getHistState = callback;
        }
    }

    render() {
        console.log('window');

        return (<div style={this.styles}>
                    <div>
                        <img src='https://picsum.photos/200/50' onClick={this.onClickHandler} width='200px' height='50px' alt='' />
                    </div>
                    <div>
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


