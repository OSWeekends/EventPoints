import React from 'react';
import { storiesOf } from '@storybook/react';
import Event from './Event';
import { eventMock } from './EventMock';

storiesOf('Event', module)
  .add('with no event', () => <Event />)
  .add('with event', () => <Event evento={eventMock} />);
