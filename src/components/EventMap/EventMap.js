import React from 'react';
import { Map, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import './EventMap.scss';
import euro from '../../images/svg/euro.svg';
import pointer from '../../images/svg/pointer.svg';
import calendar from '../../images/svg/calendar.svg';
import { useStore } from 'react-hookstore';

function EventMap(props) {
  const zoom = 10;
  const [events] = useStore('eventsStore');
  const [currentEvent] = useStore('selectedEventStore');

  const iconMarker = new L.Icon({
    iconUrl: require('../../images/marker.png'),
    iconSize: [50, 58],
    iconAnchor: [25, 50],
  });

  return (
    <Map
      className="MapContainer"
      style={{ backgroundColor: 'black', height: '100vh' }}
      center={[40.3995824, -3.7206383]}
      zoom={zoom}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {currentEvent.length === 0
        ? events.map(renderMarkerAndPopup())
        : currentEvent.map(renderMarkerAndPopup())}
    </Map>
  );

  function renderMarkerAndPopup() {
    return (event, index) => {
      let position;
      if (!isNaN(event.location.lat) && !isNaN(event.location.lng)) {
        position = [event.location.lat, event.location.lng];
      } else {
        position = [0, 0];
      }
      // const price = event.price.is_free;
      const cost = event.price.details;
      // const url = event.source.event_url;
      let price;
      if (event.price.is_free === true) {
        price = 'Gratis';
      } else {
        price = cost;
      }
      return (
        <Marker key={index} position={position} icon={iconMarker}>
          <Popup>
            <div className="PopUp">
              <div className="TitleEvent">
                <span>{event.title}</span>
              </div>
              <div className="InformationEvent">
                <div>
                  <span className="Data">
                    <img src={calendar} className="icon" alt="calendar" />
                    {event.date}
                  </span>
                  <span className="Data">
                    <img src={pointer} className="icon" alt="pointer" />
                    {event.location.name}
                  </span>
                </div>
                <span className="Data">
                  <img src={euro} className="icon" alt="price" /> {price}
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
      );
    };
  }
}

export default EventMap;
