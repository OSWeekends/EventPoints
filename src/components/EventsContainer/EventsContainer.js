import React, { useEffect, useState } from 'react';

import { ApiService } from '../../Services';
import Events from '../Events/Events';
import Header from '../Header/Header';
import './EventsContainer.scss';
import { createStore, useStore } from 'react-hookstore';

const eventsStore = createStore('eventsStore', []);
const loadingStore = createStore('loadingStore', true);
const selectedEventStore = createStore('selectedEventStore', []);
const filterStore = createStore('filterStore', { day: null });

function EventsContainer() {
  const [events, setEvents] = useStore(eventsStore);
  const [loading, setLoading] = useStore(loadingStore);
  const [currentEvent, setCurrentEvent] = useStore(selectedEventStore);
  const [datafilterEvent, setDataFilterEvent] = useStore(filterStore);

  const [filteredEvents, setFilteredEvents] = useState([]);

  const requestEvents = async () => {
    const data = await ApiService.getEvents();
    setEvents(data);
    setValueFilterDay(datafilterEvent.day, data);
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
    let dataFilter = { day: null };
    if (e) {
      dataFilter = {
        day: { date: e.getDate(), month: e.getMonth(), year: e.getFullYear() },
      };
    }

    setDataFilterEvent({ ...datafilterEvent, ...dataFilter });
    setValueFilterDay(dataFilter.day, events);
  };

  const setValueFilterDay = (day, events) => {
    if (day !== null) {
      const dateToFormat = `${day.date}-0${day.month + 1}-${day.year}`;
      const eventsSelectByDay = events.filter(
        item => item.date === dateToFormat
      );
      setFilteredEvents(eventsSelectByDay);
      setCurrentEvent(eventsSelectByDay);
    } else {
      setFilteredEvents([].concat(events));
      setCurrentEvent([]);
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
