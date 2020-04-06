import React, { useState } from 'react';

function ConsoleInput() {
    const [state, setState] = useState('2 + 2');

    console.log('rerendering');

    function onChangeHandler(e) {
        setState(e.target.value);
    }

    return (<div>
        <input key='ConsoleInput' type='text' value={state} onChange={onChangeHandler}>
        </input>
    </div>);
}

export default ConsoleInput;