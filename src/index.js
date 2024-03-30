import React from 'react';
import ReactDOM from 'react-dom';
import Home from './view/Home/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  return (
    <div>
      <h1>News App</h1>
      <Home />
    </div>
  );
}

root.render(<App />);
