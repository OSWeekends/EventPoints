import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Event from '../components/Event';

const eventMock = {
  abstract:
    'El email marketing es uno de los canales más potentes de adquisición de clientes. Por ello, TechHub lanza este Expert Talk con Clara Ávila, ...',
  abstract_details:
    'El email marketing es uno de los canales más potentes de adquisición de clientes. Por ello, TechHub lanza este Expert Talk con Clara Ávila, responsable de contenido online en Save The Children, con experiencia en The Cocktail y autora del blog claraavilac. En él se profundizará en las distintas estrategias de marketing de contenidos y cómo obtener los mejores resultados.\n\nAgenda:- Email marketing - presente y futuro- Inbound marketing y categorías de contenido- Planificación de contenidos y automatización- Cómo preparar una campaña: contenidos del mensaje, prototipado- Cómo conseguir nuevos suscriptores- Analítica y KPIs- Best Practices',
  date: '2017-01-24T19:00:00Z',
  location: {
    lat: 40.41249699999999,
    lng: -3.7182264000000487,
    name: 'Campus Madrid',
    notes: 'Auditorium'
  },
  price: {
    details: 'estimado',
    isFree: true,
    isTrusted: false
  },
  source: {
    event_url:
      'https://www.campus.co/madrid/en/events/ag1zfmd3ZWItY2FtcHVzcj8LEgZDYW1wdXMiBFJvb3QMCxIGQ2FtcHVzIgZtYWRyaWQMCxIFRXZlbnQiEmExOWowMDAwMDAxVHFhZUFBQww',
    logo:
      'http://tetuanvalley.com/wp-content/uploads/2016/03/opengraph-768x403.jpg',
    name: 'Campus Madrid',
    url: 'http://campus.co/madrid'
  },
  target_url:
    'https://www.techhub.com/events/improve-your-email-marketing-strategy-with-clara',
  title: 'Mejora tu estrategia de Email Marketing con Clara Ávila',
  id: 'b63ba480-f937-4ac2-8f16-46ce738a5231'
};

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('Event', module)
  .add('with no event', () => <Event />)
  .add('with event', () => <Event event={eventMock} />);
