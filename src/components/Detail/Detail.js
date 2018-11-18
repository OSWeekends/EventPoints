import React, { Component } from 'react';
import './Detail.scss';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEventId: this.props.currentEventId,
      events: this.props.events,
    };
  }

  render() {
    const currentEvent = this.state.events.filter(
      event => event.id === this.props.currentEventId
    )[0];
    // const title = currentEvent ? currentEvent.title : null;
    return currentEvent ? (
      <div className="EventDetail">
        <div className="EventDetailTitle">{currentEvent.title}</div>
        <div className="EventDetailDescription">
          {currentEvent.abstract_details}
        </div>
      </div>
    ) : null;
  }
}

export default Detail;
