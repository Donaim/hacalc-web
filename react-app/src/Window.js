import React, { Component } from 'react';
import ConsoleInput from './ConsoleInput.js';
import HistoryView from './HistoryView.js';
import ShareButton from './ShareButton.js';
import InternalsButton from './InternalsButton.js';
import { serializeRecursive, stageInterface, setInterface, getInterface, getInterfaces, interfaceGetRelativeId, subscribeInterface } from './Util.js';

function makeButton(text, handler) {
    return <button
            className="btn btn-primary"
            tabIndex='-1'
            onClick={handler}>
                {text}
                </button>
}

class Window extends Component {

    styles = {
        width: '40vw',
        float: 'left',
        margin: '20px',
        textAlign: 'left',
        height: '100%',
    };

    historyStyles = {
        height: '100%',
        overflow: 'hidden',
        overflowY: 'auto',
    };

    constructor(args) {
        super();
        this.state = {};
        this.style = args.horizontal ?
            this.horizontalStyle : this.normalStyle;
        this.ictx = args.ictx;
        this.count = args.count;
        this.id = args.id;

        this.serializedState = args.serializedState || {};

        this.deserialize = (ctx) => {
            const id = interfaceGetRelativeId(this.ictx, ctx);
            return this.serializedState[id];
        };
        subscribeInterface('deserialize-state', this.deserialize, this.ictx);

        const addWindow = getInterface('desktop:add-window', this.ictx);
        const removeWindow = getInterface('desktop:remove-window', this.ictx);
        const serialize = getInterfaces('serialize-state', this.ictx);

        const serializeThis = serializeRecursive(this.ictx, serialize);
        subscribeInterface('serialize-state',
                           serializeThis,
                           this.ictx);
        setInterface('serialize-window',
                     serializeThis,
                     this.ictx);

        this.onCloneClick = (e) => {
            const serialized = serializeThis();
            addWindow(serialized);
        };
        this.onCloseClick = (e) => {
            removeWindow();
        };
    }

    render() {
        return (<div style={this.styles}>
                    <div className="btn-group d-flex" role='group' >
                        {makeButton('Close', this.onCloseClick)}
                        <InternalsButton ictx={stageInterface(this.ictx)} id={this.id + ':InternalsButton'} />
                        <ShareButton ictx={stageInterface(this.ictx)} />
                        {makeButton('Clone', this.onCloneClick)}
                    </div>
                    <div style={this.historyStyles}>
                        <HistoryView ictx={stageInterface(this.ictx)} id={this.id + ':HistoryView'}/>
                        <ConsoleInput ictx={stageInterface(this.ictx)} />
                    </div>
                </div>
               );
    }
}

export default Window;


