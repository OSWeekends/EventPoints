import React, { Component } from 'react';
import Event from '../Event/Event';
import './Events.scss';
import dayjs from 'dayjs';
import IconMinus from '../Shared/Svg/Icon-minus';
import IconPlus from '../Shared/Svg/Icon-plus';
import { ApiService } from '../../Services';

class Events extends Component {
  static defaultProps = {
    getEvents: ApiService.getEvents,
  };

  state = {
    currentDate: null,
    loading: true,
    events: [],
    current: null,
  };

  showEventsDate(date) {
    if (window.innerWidth > 768) {
      return;
    }
    const { currentDate } = this.state;
    this.setState({
      currentDate: currentDate !== date ? date : null,
    });
  }

  componentDidMount() {
    this.requestEvents();
  }

  async requestEvents() {
    const events = await this.props.getEvents();
    this.setState({ events, loading: false });
  }

  render() {
    const colores = ['#a42551', '#521c4d', '#6f1c50', '#ab013c'];
    const { currentDate } = this.state;
    const { currentEvent, events } = this.props;
    if (!events) return null;

    const data = events.reduce((memo, d) => {
      const date = dayjs(d.datetime).format('DD MMM');

      if (memo[date] === undefined) {
        memo[date] = [];
      }
      memo[date].push(d);
      return memo;
    }, {});

    if (events.length === 0) {
      return (
        <div className="Events NoEvents">
          {' '}
          <h2> Actualmente no hay eventos</h2>{' '}
        </div>
      );
    }
    return (
      <ul className="Events">
        {Object.keys(data).map((date, index) => {
          const isCurrent = currentDate === date;
          const css = isCurrent ? 'EventsList selected' : 'EventsList';
          const color = index % colores.length;

          return (
            <li key={date} className="EventsItems">
              <button
                style={{ backgroundColor: colores[color] }}
                className="Button ButtonEventDate"
                onClick={e => this.showEventsDate(date)}
              >
                {date}
                <span className="ButtonIcon">
                  {isCurrent ? <IconMinus /> : <IconPlus />}
                </span>
              </button>

              <ul className={css}>
                {data[date].map(evento => (
                  <Event
                    key={evento.id}
                    evento={evento}
                    onSelect={() => this.props.onSelect([evento])}
                    current={currentEvent}
                  />
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Events;
