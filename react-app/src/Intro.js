import React, { Component } from 'react';
import { subscribeInterface } from './Util.js';

class Intro extends Component {

    constructor(args) {
        super();
        this.state = {
            hidden: false,
        };

        if (window.location.pathname !== '/') {
            this.state.hidden = true;
        }

        const hide = () => {
            if (this.state.hidden) { return; }
            const update = (state) => ({...state, hidden: true });
            if (this.mounted) {
                this.setState(update);
            } else {
                this.state = update(this.state);
            }
        };
        subscribeInterface('server-calc', hide);
    }

    componentDidMount() {
        this.mounted = true;
    }

    examples = [
        "2 + 2 * 2",
        "2 ^ 77",
        "1 << 77",
        "base 2 (1 << 77)",
        "0001#2 + 100101#2",
        "FF00AA#16 + 100101#2",
        "1 << 3",
        "0100#2 | 1001#2",
        "digits 100 pi",
    ];
    mapped = this.examples.map(w => <React.Fragment key={w}> Try <code> {w} </code> <br></br> </React.Fragment>);

    render() {
        if (this.state.hidden) {
            return null;
        } else {
            return (<React.Fragment>
                        <img src={"big-logo.png"} alt="Logo" />
                        <p> This is <a href="https://github.com/Donaim/hacalc" >Hacalc</a> - a calculator based on term rewriting </p>
                        <p> {this.mapped} </p>
                    </React.Fragment>);
        }
    }
}

export default Intro;
