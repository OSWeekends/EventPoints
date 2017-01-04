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
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import MoneyOff from 'material-ui/svg-icons/editor/money-off';

import events from './../final.json';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title="eventPoints" className="app-bar"/>
        <div className="card-container">
          {events.map(({ id, title, name, location, abstract, source, price }) =>
            <Card key={id} className="card">
              <CardHeader
                title={title}
                subtitle={location.name}
                avatar={source.logo}
                actAsExpander={false}
                showExpandableButton={false}
              />
              <CardText>
                {abstract}
                <br/>
                {!price.isFree && <MoneyOff />}
              </CardText>
              <Divider />
              <CardActions>
                <FlatButton href={source.event_url} label="Event url" />
              </CardActions>
            </Card>)}
        </div>
      </div>
    );
  }
}

export default App;
