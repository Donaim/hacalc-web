import React, { Component } from 'react';
import { getInterface } from './Util.js';

class ShareButton extends Component {
    constructor(args) {
        super();

        this.ictx = args.ictx;
        this.state = null;

        const share = getInterface('share');
        const serializeWindow = getInterface('serialize-window', this.ictx);

        this.onClick = (e) => {
            const st = serializeWindow();
            const ret = share(st);
            console.log(ret);
            alert(ret);
        };
    }

    render() {
        return (<button className="btn btn-primary"
                        tabIndex='-1'
                        onClick={this.onClick} >
                    Share
                </button>);
    }
}

export default ShareButton;


