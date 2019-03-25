import React, { useEffect, useState } from 'react';

import { ApiService } from '../../Services';
import Events from '../Events/Events';
import Header from '../Header/Header';
import './EventsContainer.scss';
import { createStore, useStore } from 'react-hookstore';

const eventsStore = createStore('eventsStore', []);
const loadingStore = createStore('loadingStore', true);
const selectedEventStore = createStore('selectedEventStore', {});

function EventsContainer() {
  const [events, setEvents] = useStore(eventsStore);
  const [loading, setLoading] = useStore(loadingStore);
  const [currentEvent, setCurrentEvent] = useStore(selectedEventStore);

  const [filteredEvents, setFilteredEvents] = useState([]);

  const requestEvents = async () => {
    const data = await ApiService.getEvents();
    setEvents(data);
    setFilteredEvents([].concat(data));
    setLoading(false);
  };

  useEffect(() => {
    requestEvents();
  }, []);

  const filterEventByTitle = e => {
    const filterTitle = e.target.value;
    const eventsSelectByTitle = events.filter(item => {
      return item.title.toLowerCase().includes(filterTitle.toLowerCase());
    });
    setFilteredEvents(eventsSelectByTitle);
  };

  const filterEventByDay = e => {
    if (e) {
      const dateToFormat = `${e.getDate()}-0${e.getMonth() +
        1}-${e.getFullYear()}`;
      const eventsSelectByDay = events.filter(
        item => item.date === dateToFormat
      );
      setFilteredEvents(eventsSelectByDay);
    } else {
      setFilteredEvents([].concat(events));
    }
  };

  const filterEventByMoney = e => {
    const eventsFree = events.filter(item => item.price.is_free === true);
    setFilteredEvents(eventsFree);
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="EventsContainer">
      <Header
        filterEventByTitle={filterEventByTitle}
        filterEventByDay={filterEventByDay}
        filterEventByMoney={filterEventByMoney}
      />
      <Events
        events={filteredEvents}
        onSelect={setCurrentEvent}
        currentEvent={currentEvent}
      />
      {/* <Detail events={events} currentEventId={currentEvent} /> */}
      {/* <EventMap /> */}
    </div>
  );
}

export default EventsContainer;
