import React, { Component } from 'react';
import Detail from '../Detail/Detail';
import Action from '../Action/Action';
import Social from '../Social/Social';

class Details extends Component {
  render() {
    return (
      <div className="Details">
        <Detail />
        <Action />
        <Social />
      </div>
    );
  }
}

export default Details;
