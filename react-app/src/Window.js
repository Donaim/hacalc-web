import React, { Component } from 'react';
import ConsoleInput from './ConsoleInput.js';
import HistoryView from './HistoryView.js';
import ShareButton from './ShareButton.js';
import InternalsButton from './InternalsButton.js';
import { stageInterface, setInterface, getInterface, getInterfaces, interfaceGetRelativeId, subscribeInterface } from './Util.js';

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

        const deserializeI = getInterface('deserialize-state', this.ictx);
        this.serializedState = args.serializedState || deserializeI() || {};

        var lock = false;
        function myself() { return lock; }
        this.serializeThis = () => {
            if (lock) { return myself; }
            lock = true;
            const allStates = serialize();
            lock = false;
            const serialized = {};
            for (var i = 0; i < allStates.length; i++) {
                const [ctx, response] = allStates[i];
                if (response !== myself) {
                    const id = interfaceGetRelativeId(this.ictx, ctx);
                    serialized[id] = response;
                }
            }
            return serialized;
        };
        subscribeInterface('serialize-state',
                           this.serializeThis,
                           this.ictx);
        setInterface('serialize-window',
                     this.serializeThis,
                     this.ictx);

        this.deserialize = (ctx) => {
            const id = interfaceGetRelativeId(this.ictx, ctx);
            // console.log('deserialize', ctx, 'id:', id, 'from', this.serializedState);
            return this.serializedState[id];
        };
        subscribeInterface('deserialize-state', this.deserialize, this.ictx);

        const addWindow = getInterface('desktop:add-window', this.ictx);
        const removeWindow = getInterface('desktop:remove-window', this.ictx);
        const serialize = getInterfaces('serialize-state', this.ictx);

        this.onCloneClick = (e) => {
            const serialized = this.serializeThis();
            addWindow(serialized);
        };
        this.onCloseClick = (e) => {
            removeWindow();
        };
    }

    render() {
        console.log('window');

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


