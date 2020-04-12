import React, { Component } from 'react';

class HistoryElement extends Component {

    constructor(args) {
        super();

        const elem = args.elem;
        const isString = typeof elem == 'string';
        const isResponse = isString ? false : elem.isResponse;
        this.text = isString ? elem : elem.text;
        this.styles = isResponse ? { backgroundColor: '#61dafb', border: '1px solid #61dafb' } : { backgroundColor: 'white' } ;
    }

    render() {
        return (<div>
                <input tabIndex={-1}
                       readOnly={true}
                       value={this.text}
                       style={this.styles}
                       />
                </div>);
    }
}

export default HistoryElement;
