import React, { Component } from 'react';
import Event from '../Event/Event';
import './Events.scss';
import dayjs from 'dayjs';
import IconMinus from '../Shared/Svg/Icon-minus';
import IconPlus from '../Shared/Svg/Icon-plus';

class Events extends Component {
  state = {
    currentDate: null
  };

  selectEvent = id => {
    const { onSelect } = this.props;
    onSelect(id);
  };

  showEventsDate(date) {
    if (window.innerWidth > 768) {
      return;
    }

    const { currentDate } = this.state;
    this.setState({
      currentDate: currentDate !== date ? date : null
    });
  }

  render() {
    const colores = ['#a42551', '#521c4d', '#6f1c50', '#ab013c'];
    const { currentDate } = this.state;
    const { currentEvent, events } = this.props;

    const data = events.reduce((memo, d) => {
      const date = dayjs(d.date).format('DD MMM');

      if (memo[date] === undefined) {
        memo[date] = [];
      }
      memo[date].push(d);
      return memo;
    }, {});

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
                    onSelect={this.selectEvent}
                    current={currentEvent}
                  />
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
