import React, { Component } from 'react';
import { getInterface } from './Util';

type ConsoleInputProps = {
    ictx : any;
};

type ConsoleInputState = {
    value : string;
};

class ConsoleInput extends Component<ConsoleInputProps, ConsoleInputState> {

    styles = {
        width: '100%',
        paddingLeft: '5px',
    };

    immediateValue;
    updateValue;
    onChangeHandler;
    onResponseHandler;
    onSubmitHandler;

    constructor(args) {
        super(args);

        this.immediateValue = '';
        this.state = {value: this.immediateValue};

        const historyAddResponse = getInterface('history-add-response', args.ictx);
        const serverHandlerSend = getInterface('server-calc', args.ictx);

        this.updateValue = (value) => {
            this.immediateValue = value;
            this.setState({value: value});
        };

        this.onChangeHandler = (e) => {
            const value = e.target.value;
            this.updateValue(value);
        };

        this.onResponseHandler = (response) => {
            historyAddResponse(response);
        }

        this.onSubmitHandler = (e) => {
            e.preventDefault();
            console.log('submitting', this.immediateValue);
            serverHandlerSend(this.immediateValue, this.onResponseHandler);
            this.updateValue("");
        };
    }

    render() {
        return (<div>
            <form action='#' onSubmit={this.onSubmitHandler}>
                <input key='ConsoleInput'
                       type='text'
                       style={this.styles}
                       value={this.state.value}
                       onChange={this.onChangeHandler}>
                </input>
            </form>
        </div>);
    }
}

export default ConsoleInput;
