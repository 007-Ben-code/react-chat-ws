import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// routes
import Router from './Router';

function App( props ) {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
