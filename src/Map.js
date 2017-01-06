import React from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";

import mapStyles from './map-styles';
import markerIcon from './marker_chapultepec_blue.svg';

const Map = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultOptions={{ styles: mapStyles }}
    defaultZoom={14}
    defaultCenter={{ lat: 40.4162432, lng: -3.7216879 }}
    zoom={props.zoom}
    center={props.center}
    // onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker
        // {...marker}
        key={marker.id}
        position={{
          lat: marker.location.lat,
          lng: marker.location.lng
        }}
        onClick={() => props.onMarkerClick(marker.id)}
        icon={{
          path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
          fillColor: '#00BCD4',
          fillOpacity: 1,
          strokeColor: '',
          strokeWeight: 0
        }}
      >
        {props.markerInfo === marker.id &&
          <InfoWindow onCloseClick={props.onMarkerClose}>
            <div>{marker.title}</div>
          </InfoWindow>
        }
      </Marker>
    ))}
  </GoogleMap>
)));

// Map.defaultProps = {
//   defaultZoom: 14,
//   defaultCenter: { lat: 40.4162432, lng: -3.7216879 }
// };

export default Map;
