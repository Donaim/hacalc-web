import React, { Component } from 'react';
import ConsoleInput from './ConsoleInput.js';
import HistoryView from './HistoryView.js';
import { stageInterface } from './Util.js';

class Window extends Component {

    styles = { float: 'left' };

    constructor(args) {
        super();
        this.state = {};
        this.style = args.horizontal ?
            this.horizontalStyle : this.normalStyle;
        this.ictx = stageInterface(args.ictx);
        this.onClickHandler = (e) => {
            alert('clicked');
        };
    }

    render() {
        console.log('window');

        return (<div style={this.styles}>
                    <div style={this.styles}>
                        <HistoryView ictx={this.ictx} />
                        <ConsoleInput ictx={this.ictx} />
                    </div>
                    <div style={this.styles}>
                        <img src='https://picsum.photos/10/200' onClick={this.onClickHandler} />
                    </div>
                </div>
               );
    }
}

export default Window;


