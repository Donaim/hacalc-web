import React, { Component } from 'react';
import { getInterface, subscribeInterface, unsubscribeInterface } from './Util';

type Props = {
    ictx : any;
    elem : any;
    id : any;
};

type State = {
    hide : boolean;
};

class HistoryElement extends Component<Props, State> {

    ictx : any;
    id : any;
    mounted : boolean;
    isInternal : boolean;
    isMinimal : boolean;
    text : string;
    style : React.CSSProperties;
    elem : any;
    serialize : any;
    deserialize : any;
    wrapSetState : any;
    setVisibility : any;

    constructor(args) {
        super(args);

        this.ictx = args.ictx;
        this.id = args.id;
        this.mounted = false;

        const elem = args.elem;
        const isString = typeof elem == 'string';
        const isResponse = isString ? false : elem.isResponse;
        this.isInternal = elem.isInternal;
        this.isMinimal = elem.isFinal || !elem.isResponse;
        this.text = isString ? elem : elem.text;

        this.style = isResponse ? { backgroundColor: '#61dafb', border: '1px solid #61dafb' } : { backgroundColor: 'white' };
        this.style.width = '100%';
        this.style.paddingLeft = '5px';

        this.elem = (<input tabIndex={-1}
                            readOnly={true}
                            value={this.text}
                            style={this.style}
                     />);

        this.serialize = () => {
            return this.state;
        };

        const deserialize = getInterface('deserialize-state', this.ictx);
        this.state = deserialize();
        subscribeInterface('serialize-state',
                           this.serialize,
                           this.ictx);

        this.wrapSetState = (modifier) => {
            if (this.mounted) {
                this.setState(modifier);
            } else {
                this.state = modifier(this.state);
            }
        };

        this.setVisibility = (mode) => {
            // console.log("my visib:", this.state.hide); // DEBUG
            switch (mode) {
            case 'Minimal':
                return this.wrapSetState((state) => ({ hide: !this.isMinimal }));
            case 'Internals':
                return this.wrapSetState((state) => ({ hide: this.isInternal }));
            case 'Internals*':
                return this.wrapSetState((state) => ({ hide: false }));
            default:
                throw new Error("Unknown visibility mode: " + mode);
            }
        };
        subscribeInterface('history-update', this.setVisibility, this.ictx);

        const getVisibilityMode = getInterface('get-visibility-mode', this.ictx);
        if (!this.state) {
            const mode = getVisibilityMode();
            // console.log('setting visib to:', mode);
            this.setVisibility(mode);
        }
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
        unsubscribeInterface('history-update', this.setVisibility, this.ictx);
        unsubscribeInterface('serialize-state', this.serialize, this.ictx);
    }

    render() {
        var elem;

        if (this.state.hide) {
            elem = null;
        } else {
            elem = this.elem;
        }

        return (<React.Fragment>{elem}</React.Fragment>);
    }
}

export default HistoryElement;
