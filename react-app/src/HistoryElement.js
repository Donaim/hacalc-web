import React, { Component } from 'react';

class HistoryElement extends Component {

    constructor(args) {
        super();
    }

    render() {
        return (<div>
                <input readOnly={true} value={this.props.elem} />
                </div>);
    }
}

export default HistoryElement;
