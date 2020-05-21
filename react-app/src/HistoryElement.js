import React, { Component } from 'react';
import { subscribeInterface, unsubscribeInterface } from './Util.js';

class HistoryElement extends Component {

    constructor(args) {
        super();

        this.ictx = args.ictx;
        this.mounted = false;
        this.state = args.elem.initialState || { hide: true };
        args.elem.initialState = this.state;

        this.wrapSetState = (modifier) => {
            if (this.mounted) {
                this.setState((state) => {
                    args.elem.initialState = modifier(state);
                    return args.elem.initialState;
                });
            } else {
                args.elem.initialState = modifier(args.elem.initialState);
                this.state = args.elem.initialState;
            }
        };

        const elem = args.elem;
        const isString = typeof elem == 'string';
        const isResponse = isString ? false : elem.isResponse;
        this.isInternal = elem.isInternal;
        this.text = isString ? elem : elem.text;

        this.style = isResponse ? { backgroundColor: '#61dafb', border: '1px solid #61dafb' } : { backgroundColor: 'white' };
        this.style.width = '100%';

        this.elem = (<input tabIndex={-1}
                            readOnly={true}
                            value={this.text}
                            style={this.style}
                     />);

        this.setVisibility = (shouldHide) => {
            if (this.isInternal) {
                console.log("my visib:", this.state.hide); // DEBUG
                // this.setState({ hide: shouldHide });
                this.wrapSetState((state) => ({ hide: !state.hide }));
            }
        };

        subscribeInterface('history-elements:update', this.setVisibility, this.ictx);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
        unsubscribeInterface('history-elements:update', this.setVisibility, this.ictx);
    }

    render() {
        var elem;

        if (this.isInternal && this.state.hide) {
            elem = null;
        } else {
            elem = this.elem;
        }

        return (<div> {elem} </div>);
    }
}

export default HistoryElement;
