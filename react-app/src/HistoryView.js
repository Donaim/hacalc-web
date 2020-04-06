import React, { useState } from 'react';

function HistoryView() {
	const [hist, setHist] = useState(['hi there', 'how are you doing?']);
	return (<div>
		{hist.map(elem => <p>{elem}</p>)}
	</div>);
}

export default HistoryView;