import React, { Component } from 'react';
import './DateEvent.css';

class DateEvent extends Component {
  render() {
    const date = new Date(this.props.date);
    const weekDay = date
      .toLocaleString('es-es', { weekday: 'short' })
      .toUpperCase()
      .substr(0, 3);
    const monthDay = date.getDate();
    const month = date
      .toLocaleString('es-es', { month: 'short' })
      .toUpperCase()
      .substr(0, 3);
    return (
      <div className="DateEvent" class="date-event">
        <div class="col width-200">{weekDay}</div>
        <div class="col width-200">{monthDay}</div>
        <div class="col width-200">{month}</div>
      </div>
    );
  }
}

export default DateEvent;
