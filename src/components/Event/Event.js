import React, { Component } from 'react';
import DateEvent from '../DateEvent/DateEvent';
import Time from '../Shared/Time/Time';
import DetailButton from '../DetailButton/DetailButton';
import './Event.scss';
import '../images/svg/clock.svg';
import '../images/svg/euro.svg';

const Event = ({ event, onSelect, selected, color }) => {
  const css = selected ? 'Event is-selected' : 'Event';

  return (
    <li className={css}>
      <div style={{ backgroundColor: color }}>Date</div>
      <h2 className="EventTitle">{event.title}</h2>
      <p className="EventDescription">{event.abstract}</p>
      <div className="EventDetails">
        <ul className="EventInfo">
          <li className="EventInfoItem">
            <span className="TextIcon">
              <span>
                <svg
                  viewBox="0 0 20 20"
                  className="icon"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 0 0 0-16 8 8 0 0 0 0 16zm-1-7.59v-6.41h2v5.59l3.95 3.95-1.41 1.41z" />
                </svg>
              </span>
              <span>18:00</span>
            </span>
          </li>
          <li className="EventInfoItem">
            <span className="TextIcon">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  viewBox="0 0 32 32"
                >
                  <path d="M15 2C6.716 2 0 8.716 0 17s6.716 15 15 15c8.284 0 15-6.716 15-15S23.284 2 15 2zm0 27C8.373 29 3 23.627 3 17S8.373 5 15 5s12 5.373 12 12-5.373 12-12 12z" />
                  <path d="M20.963 20.136a1 1 0 0 0-1.367.362A3.018 3.018 0 0 1 17 22.001h-4a3.004 3.004 0 0 1-2.828-2H15a1 1 0 0 0 0-2h-5v-2h5a1 1 0 0 0 0-2h-4.828a3.004 3.004 0 0 1 2.828-2h4c1.062 0 2.057.576 2.596 1.503a1 1 0 0 0 1.728-1.006 5.025 5.025 0 0 0-4.325-2.497h-4a5.007 5.007 0 0 0-4.899 4H6.999a1 1 0 0 0 0 2h1v2h-1a1 1 0 0 0 0 2H8.1a5.01 5.01 0 0 0 4.899 4h4a5.025 5.025 0 0 0 4.325-2.497.999.999 0 0 0-.362-1.367z" />
                </svg>
              </span>
              <span>10,00</span>
            </span>
          </li>
        </ul>
        <DetailButton
          onClick={() => {
            onSelect(event.id);
          }}
        />
      </div>
    </li>
  );
};

export default Event;
