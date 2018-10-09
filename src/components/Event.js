import React, {Component} from 'react';
import Date from './Date';
import Time from './Time';

class Event extends Component {
  render() {
    return (
      <div className="Event">
       <Date/>
       <Time/>
      </div>
    );
  }
 }

export default Event;
