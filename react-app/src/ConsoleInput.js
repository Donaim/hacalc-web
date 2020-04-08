import React, { Component } from 'react';
import { getInterface } from './Util.js';

class ConsoleInput extends Component {

    constructor(args) {
        super();

        this.immediateValue = '2 + 2';
        this.state = {value: this.immediateValue};

        const historyAddItem = getInterface('history:add-item');
        const serverHandlerSend = getInterface('serverHandler:send');

        this.updateValue = (value) => {
            this.immediateValue = value;
            this.setState({value: value});
        };

        this.onChangeHandler = (e) => {
            const value = e.target.value;
            this.updateValue(value);
        };

        this.onSubmitHandler = (e) => {
            e.preventDefault();
            console.log('submitting', this.immediateValue);
            serverHandlerSend(this.immediateValue);

            historyAddItem(this.immediateValue);
            this.updateValue("");
        };
    }

    render() {
        return (<div>
            <form action='#' onSubmit={this.onSubmitHandler}>
                <input key='ConsoleInput'
                       type='text'
                       value={this.state.value}
                       onChange={this.onChangeHandler}>
                </input>
            </form>
        </div>);
    }
}

export default ConsoleInput;
