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
    title: '',
    filteredEvents: [],
    date: '',
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

  filterEventByTitle = e => {
    this.setState(
      {
        title: e.target.value,
      },
      () => {
        const events = [...this.state.events];
        const eventsSelectByTitle = events.filter(item => {
          return item.title
            .toLowerCase()
            .includes(this.state.title.toLowerCase());
        });
        this.setState({
          filteredEvents: eventsSelectByTitle,
        });
      }
    );
  };

  filterEventByDay = e => {
    console.log(e.target.value);
    this.setState(
      {
        date: e.target.value,
      },
      () => {
        const events = [...this.state.events];
        const eventsSelectByDay = events.map(item => {
          return item.date
            .toLowerCase()
            .includes(this.state.title.toLowerCase());
        });
        this.setState({
          filteredEvents: eventsSelectByDay,
        });
      }
    );
  };

  filterEventByMoney = e => {
    console.log('hola');
  };

  render() {
    const { currentEvent, events, loading, filteredEvents } = this.state;
    return loading ? (
      <div>Loading...</div>
    ) : (
      <div className="EventsContainer">
        <Header />
        <Search
          filterEventByTitle={this.filterEventByTitle}
          filterEventByDay={this.filterEventDay}
          filterEventByMoney={this.filterEventMoney}
        />
        <Events
          events={events}
          filteredEvents={filteredEvents}
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
