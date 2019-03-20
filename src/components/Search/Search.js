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
        <div className="Icons">
          <IconEuro filterEventByMoney={filterEventByMoney} />
          <hr />
          <IconCalendar onClick={this.showCalendar} />
          {this.state.showCalendar ? (
            <Calendar
              onChange={e => {
                filterEventByDay(e);
                this.showCalendar(e);
              }}
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
            value={this.props.name}
            onChange={filterEventByTitle}
          />
          <IconLens className="Lens" />
        </div>
      </div>
    );
  }
}

export default Search;
