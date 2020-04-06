import React from 'react';

function HistoryView({hist}) {
	return (<div>
		{hist.map(elem => <p>{elem}</p>)}
	</div>);
}

export default HistoryView;