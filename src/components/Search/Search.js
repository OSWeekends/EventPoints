import React, { Component } from 'react';
import './Search.scss';

class Search extends Component {
  render() {
    const { filterEvent } = this.props;

    return (
      <div className="Search">
        <label htmlFor="inputEvents" />
        <input
          className="search-input"
          type="text"
          name="inputEvents"
          value={this.props.name}
          onChange={filterEvent}
        />
      </div>
    );
  }
}

export default Search;
