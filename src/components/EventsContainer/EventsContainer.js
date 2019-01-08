import React, { Component } from 'react';

import { ApiService } from '../../Services';
import Events from '../Events/Events';
import Header from '../Header/Header';
import Search from '../Search/Search';
import './EventsContainer.scss';
// import EventMap from '../EventMap/EventMap';
// const Detail = ({ events, currentEvent }) => {
//   const foundedEvents = events
//     ? events.filter(event => event.id === currentEvent)
//     : null;
//   const event = foundedEvents ? foundedEvents[0] : null;

//   return event ? <div>{event.title}</div> : null;
// };

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

  onSelectEvent = selectedEvent => {
    this.setState({
      currentEvent: selectedEvent,
    });
  };

  render() {
    const { currentEvent, events, loading } = this.state;
    return loading ? (
      <div>Loading...</div>
    ) : (
      <div className="EventsContainer">
        <Header />
        <Search filterEvent={events} />
        <Events
          events={events}
          onSelect={this.onSelectEvent}
          currentEvent={currentEvent}
        />
        {/* <Detail events={events} currentEventId={currentEvent} /> */}
        {/* <EventMap /> */}
      </div>
    );
  }
}

export default EventsContainer;
