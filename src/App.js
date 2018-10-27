import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Search from './components/Search/Search';
import Events from './components/Events/Events';
import Details from './components/Details/Details';
import Map from './components/Map/Map';
import './App.scss';
import Header from './components/Header/Header';

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
