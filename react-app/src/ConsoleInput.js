import React, { Component } from 'react';
import { getInterface } from './Util.js';

class ConsoleInput extends Component {

    constructor(args) {
        super();

        this.state = {value: '2 + 2'};

        const historyAddItem = getInterface('history:add-item');

        this.onChangeHandler = (e) => {
            const value = e.target.value;
            this.setState({value: value});
            historyAddItem(value);
        };
    }

    render() {
        return (<div>
            <input key='ConsoleInput' type='text' value={this.state.value} onChange={this.onChangeHandler}>
            </input>
        </div>);
    }
}

export default ConsoleInput;