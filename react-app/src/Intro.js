import React, { Component } from 'react';
import { subscribeInterface } from './Util.js';

class Intro extends Component {

    constructor(args) {
        super();
        this.state = {
            hidden: false,
        };

        var hidden = false;
        const hide = () => {
            if (hidden) { return; }
            hidden = true;
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

    render() {
        if (this.state.hidden) {
            return null;
        } else {
            return (<img src={"logo255.png"} alt="Logo" />);
        }
    }
}

export default Intro;
