import React, { useEffect } from 'react';

import { ApiService } from '../../Services';
import Events from '../Events/Events';
import Header from '../Header/Header';
import './EventsContainer.scss';
import { createStore, useStore } from 'react-hookstore';

const eventsStore = createStore('eventsStore', []);
const loadingStore = createStore('loadingStore', true);
const selectedEventStore = createStore('selectedEventStore', []);
const filterStore = createStore('filterStore', { day: null, title: '' });

function EventsContainer() {
  const [events, setEvents] = useStore(eventsStore);
  const [loading, setLoading] = useStore(loadingStore);
  const [currentEvent, setCurrentEvent] = useStore(selectedEventStore);
  const [datafilterEvent, setDataFilterEvent] = useStore(filterStore);

  const requestEvents = async () => {
    const data = await ApiService.getEvents();
    setEvents(data);
    setCurrentEvent(applyFilter(datafilterEvent, data));
    setLoading(false);
  };

  useEffect(() => {
    requestEvents();
  }, []);

  const filterEventByTitle = e => {
    const titleFilter = { title: e.target.value };
    const newFilter = { ...datafilterEvent, ...titleFilter };

    setDataFilterEvent(newFilter);
    setCurrentEvent(applyFilter(newFilter, events));
  };

  const filterEventByDay = e => {
    const dataFilter = {
      day: { date: e.getDate(), month: e.getMonth(), year: e.getFullYear() },
    };

    const newFilter = { ...datafilterEvent, ...dataFilter };
    setDataFilterEvent(newFilter);
    setCurrentEvent(applyFilter(newFilter, events));
  };

  const filterEventByMoney = e => {
    const eventsFree = events.filter(item => item.price.is_free === true);
    setCurrentEvent(eventsFree);
  };

  const clearFilters = () => {
    setDataFilterEvent({ day: null, title: '' });
    setCurrentEvent(events);
  };

  const applyFilter = (filters, events) => {
    if (filters.title === null && filters.day === null) {
      return events;
    }

    let filteredEvents = events;
    if (filters.day !== null) {
      const dateToFormat = `${filters.day.date}-0${filters.day.month + 1}-${
        filters.day.year
      }`;
      filteredEvents = filteredEvents.filter(
        item => item.date === dateToFormat
      );
    }

    if (filters.title !== null) {
      filteredEvents = filteredEvents.filter(item => {
        return item.title.toLowerCase().includes(filters.title.toLowerCase());
      });
    }

    return filteredEvents;
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="EventsContainer">
      <Header
        filterEventByTitle={filterEventByTitle}
        filterEventByDay={filterEventByDay}
        filterEventByMoney={filterEventByMoney}
        clearFilters={clearFilters}
        titleSearch={datafilterEvent.title}
      />
      <Events
        events={currentEvent}
        onSelect={setCurrentEvent}
        currentEvent={currentEvent}
      />
      {/* <Detail events={events} currentEventId={currentEvent} /> */}
      {/* <EventMap /> */}
    </div>
  );
}

export default EventsContainer;
