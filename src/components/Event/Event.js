import React, { Component } from 'react';
import DateEvent from '../DateEvent/DateEvent';
import Time from '../Shared/Time/Time';
import DetailButton from '../DetailButton/DetailButton';
import './Event.scss';
import '../../images/svg/clock.svg';
import '../../images/svg/euro.svg';
import IconClock from '../Shared/Svg/Icon-clock';
import IconEuro from '../Shared/Svg/Icon-euro';

const Event = ({ evento, onSelect, selected, color }) => {
  const css = selected ? 'Event is-selected' : 'Event';

  return (
    <li className={css}>
      {/* <button style={{ backgroundColor: color }} className="Button ButtonEventDate">
        Date
        <div className="iconMenu">
          <span className="line"></span>
          <span className="line"></span>
        </div>
        
      </button> */}
      <div className="EventContent">
        <h2 className="EventTitle">{evento.title}</h2>
        <p className="EventDescription">{evento.abstract}</p>
        <div className="EventDetails">
          <ul className="EventInfo">
            <li className="EventInfoItem">
              <IconClock />
              18:00h
            </li>
            <li className="EventInfoItem">
              <IconEuro />
              10,00
            </li>
          </ul>
          <DetailButton
            onClick={() => {
              onSelect(evento.id);
            }}
          />
        </div>
      </div>
    </li>
  );
};

export default Event;
