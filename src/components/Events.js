import React, { Component } from 'react';
import Event from './Event';

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

  render() {
    var listEvents = this.state.events.map((event, index) => {
      return <Event key={event.id} event={event} class="col" />;
    });

    return (
      <div className="Events" class="event">
        {listEvents}
      </div>
    );
  }
}

export default Events;
