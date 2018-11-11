import React, { Component } from 'react';
import Event from '../Event/Event';
import './Events.scss';
import { ApiService } from '../../Services';
import dayjs from 'dayjs';

class Events extends Component {
  state = {
    loading: true,
    events: [],
    current: null
  };

  componentWillMount() {
    this.requestEvents();
  }

  async requestEvents() {
    const events = await ApiService.getEvents();
    this.setState({ events, loading: false });
  }

  onSelect = eventID => {
    this.setState({
      current: eventID
    });
  };

  render() {
    const colores = ['#a42551', '#521c4d', '#6f1c50', '#ab013c'];
    const { events, current } = this.state;
    const { selected } = this.props;

    const data = events.reduce((memo, d) => {
      const date = dayjs(d.date).format('DD MMMM YYYY');

      if (memo[date] === undefined) {
        memo[date] = [];
      }
      memo[date].push(d);
      return memo;
    }, {});

    return (
      <ul className="Events">
        {Object.keys(data).map((date, index) => {
          const css = selected ? 'Event-selected' : '';
          const color = index % colores.length;

          // return <li className= { css }>
          return (
            <li className="Event-selected">
              <button
                style={{ backgroundColor: colores[color] }}
                className="Button ButtonEventDate"
              >
                {date}
                <div className="iconMenu">
                  <span className="line" />
                  <span className="line" />
                </div>
              </button>
              <ul className="EventsList">
                {data[date].map(evento => (
                  <Event evento={evento} />
                ))}
              </ul>
            </li>
          );
        })}
        )
      </ul>
    );
  }
}

export default Events;
