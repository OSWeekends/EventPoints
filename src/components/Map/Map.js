import React, { Component } from 'react';
import Marker from '../Marker/Marker';

class Map extends Component {
  render() {
    return (
      <div className="Map">
        <Marker />
      </div>
    );
  }
}

export default Map;
