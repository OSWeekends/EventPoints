import React, { Component } from 'react';
import './Header.scss';
import IconMarker from '../Shared/Svg/Icon-marker';
import Search from '../Search/Search';

class Header extends Component {
  render() {
    return (
      <div className="HeaderContainer">
        <div className="Header">
          <span className="IconMarker">
            <IconMarker />
          </span>
          <h1 className="title">
            Events
            <b>Points</b>
          </h1>
        </div>
        <Search />
      </div>
    );
  }
}

export default Header;
