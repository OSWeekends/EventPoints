import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './EventMap.scss';

class EventMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.4124265,
      lng: -3.7204109,
      zoom: 13
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map
        className="mapContainer"
        style={{ backgroundColor: 'black', height: '500px', widht: '500px' }}
        center={position}
        zoom={this.state.zoom}
      >
        <TileLayer
          style={{ backgroundColor: 'black', height: '500px', widht: '500px' }}
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default EventMap;
