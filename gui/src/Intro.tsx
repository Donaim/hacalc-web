import React, { Component } from 'react';
import { getLocationQueryArg, subscribeInterface } from './Util';

type Props = {
};

type State = {
    hidden: boolean;
};

class Intro extends Component<Props, State> {

    mounted : boolean;

    constructor(args) {
        super(args);

        const startAsHidden = getLocationQueryArg('load') ? true : false;
        this.state = {
            hidden: startAsHidden,
        };

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