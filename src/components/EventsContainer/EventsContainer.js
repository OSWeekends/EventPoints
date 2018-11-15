import React, { Component } from 'react';

import { ApiService } from '../../Services';
import Events from '../Events/Events';

import './EventsContainer.scss';

const Detail = ({ events, currentEvent }) => {
  const foundedEvents = events
    ? events.filter(event => event.id === currentEvent)
    : null;
  const event = foundedEvents ? foundedEvents[0] : null;

  return event ? <div>{event.title}</div> : null;
};

class EventsContainer extends Component {
  state = {
    loading: true,
    events: null,
    currentEvent: null,
  };

  componentDidMount() {
    this.requestEvents();
  }

  requestEvents = async () => {
    const events = await ApiService.getEvents();
    this.setState({ events, loading: false });
  };

  onSelectEvent = id => {
    this.setState({
      currentEvent: id,
    });
  };

  render() {
    const { currentEvent, events, loading } = this.state;
    return loading ? (
      <div>Loading...</div>
    ) : (
      <div className="EventsContainer">
        <Events
          events={events}
          onSelect={this.onSelectEvent}
          currentEvent={currentEvent}
        />
        <Detail events={events} currentEvent={currentEvent} />
      </div>
    );
  }
}

export default EventsContainer;
