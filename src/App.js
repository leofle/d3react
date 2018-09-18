import React, { Component } from 'react';
import './App.css';
import Graph from './components/Graph/GraphSvg';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Graph />
      </div>
    );
  }
}

export default App;
