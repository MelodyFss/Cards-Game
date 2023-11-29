import React from 'react';
import './App.css';
import Card from './Card';
import Board from './Board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Memory Game!</h1>
      </header>
      <main className="App-main">
          <Board />
      </main>
      <footer className="App-footer">
        <p>Made by Melody Ponczko</p>
      </footer>
    </div>
  );
}

export default App;
