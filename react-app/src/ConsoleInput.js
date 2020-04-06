import React, { Component } from 'react';

class ConsoleInput extends Component {

    constructor() {
        super();

        this.state = {value: '2 + 2'};

        this.onChangeHandler = (e) => {
            this.setState({value: e.target.value});
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