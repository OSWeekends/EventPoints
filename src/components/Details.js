import React, {Component} from 'react';
import Detail from './Detail';
import Action from './Action';
import Social from './Social';

class Details extends Component {
  render() {
    return (
      <div className="Details">
        <Detail/>
        <Action/>
        <Social/>
      </div>
    );
  }
 }

export default Details;
