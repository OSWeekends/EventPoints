import React, { useEffect } from 'react';

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

  const requestEvents = async () => {
    const data = await ApiService.getEvents();
    setEvents(data);
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
    setEvents(eventsSelectByTitle);
  };

  const filterEventByDay = e => {
    const dateToFormat = `${e.getDate()}-0${e.getMonth() +
      1}-${e.getFullYear()}`;
    const eventsSelectByDay = events.filter(item => item.date === dateToFormat);
    console.log(eventsSelectByDay);
    setEvents(eventsSelectByDay);
  };

  const filterEventByMoney = e => {
    const eventsFree = events.filter(item => item.price.is_free === true);
    setEvents(eventsFree);
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
        events={events}
        onSelect={setCurrentEvent}
        currentEvent={currentEvent}
      />
      {/* <Detail events={events} currentEventId={currentEvent} /> */}
      {/* <EventMap /> */}
    </div>
  );
}

export default EventsContainer;
