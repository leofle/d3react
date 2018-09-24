import React, { Component } from 'react';
import * as d3 from 'd3';
import './App.css';
import Graph from './components/Graph/GraphSvg';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      graph: {}
    }
  }
	componentWillMount() {
		d3.json("flare.json").then(graph => {
			return this.setState({graph});
		});
	}

  render() {
    const {graph} = this.state;
    return (
      <div className="App">
          <Graph data={graph} />
      </div>
    );
  }
}

export default App;
