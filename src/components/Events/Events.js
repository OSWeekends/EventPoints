import React, { Component } from 'react';
import Event from '../Event/Event';
import './Events.scss';

class Events extends Component {
  constructor() {
    super();

    this.state = { load: 'loading', events: [] };
    this.requestEvents = this.requestEvents.bind(this);

    this.requestEvents();
  }

  async requestEvents() {
    const headers = new Headers();
    headers.set('Access-Control-Allow-Credentials', 'true');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Headers', '*');
    headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');

    const myInit = { headers: headers };
    try {
      const eventsResponse = await fetch(
        'http://localhost:3000/api/v1/events',
        myInit
      );
      const events = await eventsResponse.json();
      this.setState({ events: events });
    } catch (e) {
      console.log(`Error while fetching: ${e}`);
    }
  }

  state = {
    current: null
  };

  onSelect = eventID => {
    this.setState({
      current: eventID
    });
  };

  render() {
    const data = this.state.events || [];
    const { current } = this.state;
    const colores = ['#a42551', '#521c4d', '#6f1c50', '#ab013c'];

    return (
      <ul className="Events">
        {data.map((event, index) => {
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
