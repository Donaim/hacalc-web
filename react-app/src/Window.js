import React, { Component } from 'react';
import ConsoleInput from './ConsoleInput.js';
import HistoryView from './HistoryView.js';
import InternalsButton from './InternalsButton.js';
import { stageInterface, getInterface, getInterfaces, setInterface, interfaceGetRelativeId } from './Util.js';

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
        this.serializedState = args.serializedState || {};
        this.id = args.id;

        this.deserialize = (ctx) => {
            const id = interfaceGetRelativeId(this.ictx, ctx);
            // console.log('deserialize', ctx, 'id:', id, 'from', this.serializedState);
            return this.serializedState[id];
        };
        setInterface('deserialize-state', this.deserialize, this.ictx);

        const addWindow = getInterface('desktop:add-window', this.ictx);
        const removeWindow = getInterface('desktop:remove-window', this.ictx);
        const serialize = getInterfaces('serialize-state', this.ictx);

        this.onCloneClick = (e) => {
            const allStates = serialize();
            const serialized = {};
            for (var i = 0; i < allStates.length; i++) {
                const [ctx, response] = allStates[i];
                const id = interfaceGetRelativeId(this.ictx, ctx);
                serialized[id] = response;
            }
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


