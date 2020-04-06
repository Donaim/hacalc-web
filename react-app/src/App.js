import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ConsoleInput from './ConsoleInput.js'
import HistoryView from './HistoryView.js'

function App() {
  const [hist, setHist] = useState(['hi there', 'how are you doing?']);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <HistoryView hist={hist} />
        <ConsoleInput />
      </header>
    </div>
  );
}

export default App;
