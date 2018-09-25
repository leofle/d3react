import React, { Component } from 'react'
import * as d3 from 'd3'
import './App.css'
import {StoreContext} from './store'
import Header from './components/Header/Header'
import Main from './components/Main/Main'

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
        <StoreContext.Provider value={graph}>
          <Header/>
          <Main/>
        </StoreContext.Provider>
      </div>
    );
  }
}

export default App;
