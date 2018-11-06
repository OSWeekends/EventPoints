import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './EventMap.scss';
import { ApiService } from '../../Services';

class EventMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      events: [],
      zoom: 10
    };
  }

  componentWillMount() {
    this.requestEvents();
  }

  async requestEvents() {
    const events = await ApiService.getEvents();
    this.setState({ events, loading: false });
  }

  render() {
    const { events } = this.state;
    return (
      <Map
        className="MapContainer"
        style={{ backgroundColor: 'black', height: '500px', widht: '500px' }}
        center={[40.3995824, -3.7206383]}
        zoom={this.state.zoom}
      >
        <TileLayer
          style={{ backgroundColor: 'black', height: '500px', widht: '500px' }}
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {events.map((event, index) => {
          const position = [event.location.lat, event.location.lng];
          return (
            <Marker key={index} position={position}>
              <Popup>
                <span>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </span>
              </Popup>
            </Marker>
          );
        })}
      </Map>
    );
  }
}

export default EventMap;
