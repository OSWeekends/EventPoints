import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Search from './components/Search/Search';
import EventsContainer from './components/EventsContainer/EventsContainer';

// import Details from './components/Details/Details';
import EventMap from './components/EventMap/EventMap';
import './App.scss';
import Header from './components/Header/Header';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
          <Header />
          <Search />
          <Route exact path="/" component={EventsContainer} />
          <EventMap />
        </div>
      </Router>
    );
  }
}
export default App;
