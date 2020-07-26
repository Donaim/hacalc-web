import React, { Component } from 'react';
import { getInterface } from './Util';

type Props = {
    ictx : any;
};

type State = {
    text : string;
};

class ShareButton extends Component<Props, State> {

    ictx : unknown;
    onClick : (e: any) => any;

    constructor(args) {
        super(args);

        this.ictx = args.ictx;
        this.state = null;

        const share = getInterface('share');
        const serializeWindow = getInterface('serialize-window', this.ictx);

        this.onClick = (e) => {
            const st = serializeWindow();
            share(st);
        };
    }

    render() {
        return (<button className="btn btn-primary"
                        tabIndex={-1}
                        onClick={this.onClick} >
                    Share
                </button>);
    }
}

export default ShareButton;


