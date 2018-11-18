import React, { Component } from 'react';
import './Detail.scss';
import { ApiService } from '../../Services';
import IconArrowLeft from '../Shared/Svg/Icon-arrow-left';
import { Link } from 'react-router-dom';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match ? this.props.match.params.id : null,
      event: null,
    };
  }

  async componentWillMount() {
    if (this.state.id) {
      const event = await ApiService.getEventById(this.state.id);
      this.setState({ ...this.state, event });
    }
  }

  render() {
    const currentEvent = this.state.event;
    return currentEvent ? (
      <div className="EventDetail">
        <div className="GoBack">
          <Link to="/">
            <IconArrowLeft />
          </Link>
        </div>
        <div className="EventDetailTitle">{currentEvent.title}</div>
        <div className="EventDetailDescription">
          {currentEvent.abstract_details}
        </div>
      </div>
    ) : null;
  }
}

export default Detail;
