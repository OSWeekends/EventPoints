import React, { Component } from 'react';
import DateEvent from './DateEvent';
import Time from './Time';
import './Event.css';
import '../App.css';

class Event extends Component {
  // constructor(props) {
  //   super(props);
  //   // console.log(props)
  // }

  render() {
    const event = this.props.event;

    return (
      <div className="Event" class="flex-grid">
        <DateEvent date={event.date} class="col" />
        <div class="col event-component">
          <li key={event.id}>
            <h2>{event.title}</h2>
          </li>
        </div>
        <Time class="col" />
      </div>
    );
  }
}

export default Event;
