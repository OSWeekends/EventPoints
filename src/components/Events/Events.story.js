import React from 'react';
import { storiesOf } from '@storybook/react';
import Events from './Events';
import { eventsMock } from './EventsMock';

storiesOf('Events', module)
  .add('with no events', () => <Events />)
  .add('with events', () => <Events event={eventsMock} />);
