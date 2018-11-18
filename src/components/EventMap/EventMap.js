import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import './EventMap.scss';
import { ApiService } from '../../Services';
import euro from '../../images/svg/euro.svg';
import pointer from '../../images/svg/pointer.svg';
import calendar from '../../images/svg/calendar.svg';

const { BaseLayer, Overlay } = LayersControl;

class EventMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      events: [],
      zoom: 10,
    };
  }

  componentDidMount() {
    this.requestEvents();
  }

  async requestEvents() {
    const events = await ApiService.getEvents();
    this.setState({ events, loading: false });
  }

  render() {
    const { events } = this.state;
    const iconMarker = new L.Icon({
      iconUrl: require('../../images/marker.png'),
      iconSize: [50, 58],
      iconAnchor: [25, 50],
    });
    return (
      <Map
        className="MapContainer"
        style={{ backgroundColor: 'black', height: '1000px', width: '1000px' }}
        center={[40.3995824, -3.7206383]}
        zoom={this.state.zoom}
      >
        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>

          <BaseLayer name="OpenStreetMap.BlackAndWhite">
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </BaseLayer>

          {events.map((event, index) => {
            let position;
            try {
              if (!isNaN(event.location.lat) && !isNaN(event.location.lng)) {
                position = [event.location.lat, event.location.lng];
              }
            } catch (e) {
              position = [0, 0];
            }
            // const price = event.price.is_free;
            const cost = event.price.details;
            // const url = event.source.event_url;

            if (event.price.is_free === true) {
              this.price = 'Gratis';
            } else {
              this.price = cost;
            }

            return (
              <Overlay name={event.title}>
                <Marker position={position} icon={iconMarker}>
                  <Popup>
                    <div className="PopUp">
                      <div className="TitleEvent">
                        <span>{event.title}</span>
                      </div>
                      <div className="InformationEvent">
                        <div>
                          <span className="Data">
                            <img
                              src={calendar}
                              className="icon"
                              alt="calendar"
                            />
                            {event.date}
                          </span>
                          <span className="Data">
                            <img src={pointer} className="icon" alt="pointer" />
                            {event.location.name}
                          </span>
                        </div>
                        <span className="Data">
                          <img src={euro} className="icon" alt="price" />{' '}
                          {this.price}
                        </span>
                      </div>
                      <div className="DescriptionEvent">
                        <span>
                          Más info:{' '}
                          <a className="Link" href={event.target_url}>
                            {' '}
                            Pincha aquí
                          </a>
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </Overlay>
            );
          })}
        </LayersControl>
      </Map>
    );
  }
}

export default EventMap;
