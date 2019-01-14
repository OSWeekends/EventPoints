import React, { Component } from 'react';
import IconClock from '../Shared/Svg/Icon-clock';
import IconEuro from '../Shared/Svg/Icon-euro';
import Calendar from 'react-calendar';
import './Search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false,
    };

    this.showCalendar = this.showCalendar.bind(this);
  }

  // showCalendar(e) {
  //   this.state.showCalendar === false
  //     ? this.setState({
  //         showCalendar: true,
  //       })
  //     : this.setState({
  //         showCalendar: false,
  //       });
  // }

  render() {
    const {
      filterEventByTitle,
      filterEventByDay,
      filterEventByMoney,
    } = this.props;

    return (
      <div className="Search">
        <IconEuro onClick={filterEventByMoney} />
        <IconClock onClick={this.showCalendar} />
        {this.state.showCalendar ? (
          <Calendar onChange={filterEventByDay} />
        ) : null}
        <label htmlFor="inputEvents" />
        <input
          className="search-input"
          type="text"
          name="inputEvents"
          value={this.props.name}
          onChange={filterEventByTitle}
        />
      </div>
    );
  }
}

export default Search;
