import React, { Component } from 'react';

class HistoryElement extends Component {

    constructor(args) {
        super();
    }

    render() {
        return (<div><p>{this.props.elem}</p></div>);
    }
}

export default HistoryElement;
