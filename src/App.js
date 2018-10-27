import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Header from './components/Header';
import Search from './components/Search';
import Events from './components/Events';
import Details from './components/Details';
import Map from './components/Map';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
          <Header />
          <Search />
          <Route exact path="/" component={Events} />
        </div>
      </Router>
    );
  }
}
export default App;
