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

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="EventsContainer">
      <Header />
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
