import React, { Component } from 'react';
import { appendInterface } from './Util.js';

class HistoryElement extends Component {

    constructor(args) {
        super();

        this.ictx = args.ictx;
        const elem = args.elem;
        const isString = typeof elem == 'string';
        const isResponse = isString ? false : elem.isResponse;
        this.isInternal = elem.isInternal;
        this.text = isString ? elem : elem.text;

        const baseStyles = isResponse ? { backgroundColor: '#61dafb', border: '1px solid #61dafb' } : { backgroundColor: 'white' };
        baseStyles.width = '100%';
        this.stylesVisible = { ... baseStyles, display: 'auto'};
        this.stylesNotVisible = { ... baseStyles, display: 'none'};

        this.state = {
            hide: true,
        };

        this.setVisibility = (shouldHide) => {
            if (this.isInternal) {
                console.log("set visib"); // DEBUG
                this.setState({ hide: shouldHide });
            }
        };

        appendInterface('history-elements:update', this.setVisibility, this.ictx);
    }

    render() {
        const st = (this.isInternal && this.state.hide)
            ? this.stylesNotVisible
            : this.stylesVisible;

        return (<div>
                <input tabIndex={-1}
                       readOnly={true}
                       value={this.text}
                       style={st}
                       />
                </div>);
    }
}

export default HistoryElement;
