import React, { Component } from 'react';
import sendMessageToRef from './Util.js';

class ConsoleInput extends Component {

    constructor(args) {
        super();

        this.state = {value: '2 + 2'};

        this.onChangeHandler = (e) => {
            const value = e.target.value;
            this.setState({value: value});
            sendMessageToRef(args.historyViewRef, {type: 'addItem', value: value});
        };
    }

    render() {
        console.log('rerendering');

        return (<div>
            <input key='ConsoleInput' type='text' value={this.state.value} onChange={this.onChangeHandler}>
            </input>
        </div>);
    }
}

export default ConsoleInput;