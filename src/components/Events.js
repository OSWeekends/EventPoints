import React, { Component } from 'react';
import Event from './Event';
import './Events.scss';
import { ApiService } from '../Services';

class Events extends Component {
  state = {
    loading: true,
    events: [],
    current: null
  };

  componentWillMount() {
    this.requestEvents();
  }

  async requestEvents() {
    const events = await ApiService.getEvents();
    this.setState({ events, loading: false });
  }

  onSelect = eventID => {
    this.setState({
      current: eventID
    });
  };

  render() {
    const { events, current } = this.state;
    const colores = ['red', 'green', 'yellow', '#fabada', 'purple'];

    return (
      <ul className="Events">
        {events.map((event, index) => {
          const color = index % 5;

          const selected = event.id === current;
          return (
            <Event
              color={colores[color]}
              selected={selected}
              onSelect={this.onSelect}
              event={event}
              key={event.title}
            />
          );
        })}
      </ul>
    );
  }
}

export default Events;
