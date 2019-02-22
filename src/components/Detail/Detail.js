import React from 'react';
import './Detail.scss';
import IconArrowLeft from '../Shared/Svg/Icon-arrow-left';
import { Link } from 'react-router-dom';
import { useStore } from 'react-hookstore';

function Detail(props) {
  // const id = props.match ? props.match.params.id : null;
  const [event] = useStore('selectedEventStore');

  return event ? (
    <div className="EventDetail">
      <div className="GoBack">
        <Link to="/">
          <IconArrowLeft />
        </Link>
      </div>
      <div className="EventDetailTitle">{event.title}</div>
      <div
        className="EventDetailDescription"
        dangerouslySetInnerHTML={{ __html: event.abstract_details }}
      />
    </div>
  ) : null;
}

export default Detail;
