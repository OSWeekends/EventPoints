import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import MoneyOff from 'material-ui/svg-icons/editor/money-off';
import CircularProgress from 'material-ui/CircularProgress';

import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Map from './Map';

import events from './../final.json';

import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      events,
      isSidebarOpen: true,
      mapZoom: 14,
      mapCenter: { lat: 40.4162432, lng: -3.7216879 },
      markerInfoId: null
    }
  }

  handleCardClick = (lat, lng) => {
    this.setState({
      isSidebarOpen: false,
      mapCenter: { lat, lng },
      mapZoom: 17
    })
  }

  handleMarkerClick = markerId => {
    this.setState({
      mapZoom: 17,
      markerInfoId: markerId
    })
  };
  handleMarkerClose = () => this.setState({ markerInfoId: null });
  
  render() {
    return (
      <div>
        <AppBar
          title="eventPoints"
          className="app-bar"
          onLeftIconButtonTouchTap={() => this.setState({ isSidebarOpen: !this.state.isSidebarOpen })}
        />
        <Drawer
          open={this.state.isSidebarOpen}
          width={360}
          // docked={true}
        >
          <AppBar
            title="eventPoints"
            iconElementLeft={null}
            iconStyleLeft={{ display: 'none' }}
            onRightIconButtonTouchTap={() => this.setState({ isSidebarOpen: !this.state.isSidebarOpen })}
            iconElementRight={
              <IconButton>
                <NavigationClose />
              </IconButton>
            }
          />
          {this.state.events.map(({ id, title, name, location, abstract, source, price }) =>
            <Card
              key={id}
              className="card"
              onClick={() => this.handleCardClick(location.lat, location.lng)}
            >
              <CardHeader
                title={title}
                subtitle={location.name}
                avatar={source.logo}
                actAsExpander={false}
                showExpandableButton={false}
              />
              <Divider />
              <CardActions>
                <FlatButton href={source.event_url} label="Event url" />
              </CardActions>
            </Card>)
          }
        </Drawer>
        <div className="_card-container">
          <Map
            loadingElement={<CircularProgress />}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp"
            containerElement={<div className="map-container" />}
            mapElement={<div className="map-element" />}
            onMarkerClick={e => console.log(e)}
            markers={events}
            zoom={this.state.mapZoom}
            center={this.state.mapCenter}
            onMarkerClick={this.handleMarkerClick}
            onMarkerClose={this.handleMarkerClose}
            markerInfo={this.state.markerInfoId}
          />
        </div>
      </div>
    );
  }
}

export default App;
