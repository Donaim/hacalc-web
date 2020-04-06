import React from 'react';
import logo from './logo.svg';
import './App.css';
import ConsoleInput from './ConsoleInput.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ConsoleInput />
      </header>
    </div>
  );
}

export default App;
