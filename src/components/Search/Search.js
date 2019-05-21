import React, { Component } from 'react';
import IconCalendar from '../Shared/Svg/Icon-calendar';
import IconLens from '../Shared/Svg/Icon-lens';
import IconEuro from '../Shared/Svg/Icon-euro';
import Calendar from 'react-calendar';
import './Search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false,
      date: null,
    };
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  toggleCalendar() {
    this.setState(prevState => {
      return {
        showCalendar: !prevState.showCalendar,
      };
    });
  }

  clearFilters() {
    this.setState({ date: null });
    this.props.clearFilters();
  }

  setCalendarDate(date) {
    this.setState(prevState => {
      return {
        date: this.datesAreEqual(date, prevState.date) ? null : date,
      };
    });
  }

  datesAreEqual(dateA, dateB) {
    if (
      dateA &&
      dateB &&
      dateA.getYear() === dateB.getYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDay() === dateB.getDay()
    ) {
      return true;
    }
    return false;
  }

  render() {
    const {
      filterEventByTitle,
      filterEventByDay,
      filterEventByMoney,
      titleSearch,
    } = this.props;

    return (
      <div className="Search">
        <div className="Icons">
          <IconEuro filterEventByMoney={filterEventByMoney} />
          <hr />
          <IconCalendar onClick={this.toggleCalendar} />
          {this.state.showCalendar ? (
            <Calendar
              className="Calendar"
              onChange={date => {
                this.toggleCalendar(date);
                this.setCalendarDate(date);
                filterEventByDay(date);
              }}
              value={this.state.date}
            />
          ) : null}
        </div>
        <div className="InputSearch">
          <label htmlFor="inputEvents" />
          <input
            className="Input"
            type="text"
            name="inputEvents"
            placeholder="Buscador de eventos"
            value={titleSearch}
            onChange={filterEventByTitle}
          />
          <IconLens className="Lens" />
          <div className="Clear" onClick={this.clearFilters}>
            X
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
