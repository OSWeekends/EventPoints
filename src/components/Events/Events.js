import React, { Component } from 'react';
import Event from '../Event/Event';
import './Events.scss';
import { ApiService } from '../../Services';

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
    const data = this.state.events || [];
    const { current } = this.state;
    const colores = ['#a42551', '#521c4d', '#6f1c50', '#ab013c'];
    const { events, current } = this.state;

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
