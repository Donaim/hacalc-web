import React, { Component } from 'react';
import ConsoleInput from './ConsoleInput.js';
import HistoryView from './HistoryView.js';
import { stageInterface } from './Util.js';

class Window extends Component {

    styles = { float: 'left', margin: '20px', border: '2px solid black', textAlign: 'left' };

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
                    <div>
                        <img src='https://picsum.photos/200/50' onClick={this.onClickHandler} width='200px' height='50px' />
                    </div>
                    <div>
                        <HistoryView ictx={this.ictx} initialState={this.props.initialState}/>
                        <ConsoleInput ictx={this.ictx} />
                    </div>
                </div>
               );
    }
}

export default Window;


