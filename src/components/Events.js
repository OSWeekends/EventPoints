import React, { Component } from 'react';
import Event from './Event';
import './Events.scss'

class Events extends Component {
  state = {
    current: null
  }

  onSelect = (eventID) => {
    this.setState({
      current: eventID
    })
  }

  render() {
    const {data} = this.props
    const {current} = this.state
    const colores = ['red', 'green', 'yellow', '#fabada', 'purple']
    return (
      <ul className="Events">
        {data.map((event, index) => {
          const color = index % 5

          const selected = event.id === current
          return <Event 
            color={colores[color]}
            selected={selected}
            onSelect={this.onSelect}
            event={event}
            key={event.title}
          />
        })}
      </ul>
    );
  }
}


export default Events;
