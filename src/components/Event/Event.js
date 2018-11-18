import React, { Component } from 'react';
// import DateEvent from '../DateEvent/DateEvent';
// import Time from '../Shared/Time/Time';
import DetailButton from '../DetailButton/DetailButton';
import './Event.scss';
import '../../images/svg/clock.svg';
import '../../images/svg/euro.svg';
import IconClock from '../Shared/Svg/Icon-clock';
import IconEuro from '../Shared/Svg/Icon-euro';
// import { render } from 'react-testing-library';
import { Link } from 'react-router-dom';

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: this.props.key,
      evento: this.props.evento,
      onSelect: this.props.onSelect,
      current: this.props.current,
    };
  }

  componentWillReceiveProps() {
    const isCurrent = this.props.evento
      ? this.props.evento.id === this.state.current
      : false;
    const css = isCurrent ? 'Event is-selected' : 'Event';
    this.setState({ ...this.state, css });
  }

  // handleDetailButtonClick(eventId) {
  //   this.props.history.push(`/${eventId}`);
  // }

  render() {
    const evento = this.state.evento ? this.state.evento : {};

    return (
      <li className={this.state.css}>
        <div className="EventContent">
          <h2 className="EventTitle">{evento.title}</h2>
          <p className="EventDescription">{evento.abstract}</p>
          <div className="EventDetails">
            <ul className="EventInfo">
              <li className="EventInfoItem" id="evento.id">
                <IconClock />
                <span>18:00h</span>
              </li>
              <li className="EventInfoItem">
                <IconEuro />
                {evento.price && evento.price.is_free ? (
                  <span>Free</span>
                ) : (
                  <span>{evento.price ? evento.price.details : null}</span>
                )}
              </li>
            </ul>
            <Link to={'/' + evento.id}>
              <DetailButton />
            </Link>
          </div>
        </div>
      </li>
    );
  }
}

// const Event = ({ evento, onSelect, current }) => {
//   const isCurrent = evento.id === current;
//   const css = isCurrent ? 'Event is-selected' : 'Event';
//   return (
//     <li className={css}>
//       <div className="EventContent">
//         <h2 className="EventTitle">{evento.title}</h2>
//         <p className="EventDescription">{evento.abstract}</p>
//         <div className="EventDetails">
//           <ul className="EventInfo">
//             <li className="EventInfoItem" id="evento.id">
//               <IconClock />
//               <span>18:00h</span>
//             </li>
//             <li className="EventInfoItem">
//               <IconEuro />
//               {evento.price.is_free ? (
//                 <span>Free</span>
//               ) : (
//                 <span>{evento.price.details}</span>
//               )}
//             </li>
//           </ul>
//           <DetailButton onClick={() => onSelect(evento.id)} />
//         </div>
//       </div>
//     </li>
//   );
// };

export default Event;
