import React, { Component } from 'react';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEvent: this.props.currentEvent,
    };
  }

  render() {
    const currentEvent = this.state.currentEvent;
    const title = currentEvent ? currentEvent.title : null;
    return <div className="Detail">{title}</div>;
  }
}

export default Detail;
