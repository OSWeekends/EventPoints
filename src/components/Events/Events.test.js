import 'jest-dom/extend-expect';
import React from 'react';
import { render, wait } from 'react-testing-library';
import Events from './Events';
import { eventsMock } from './EventsMock';

test('loads and show events', async () => {
  // Mock the API method
  const mockGetEvents = jest.fn(() => Promise.resolve(eventsMock));
  // we inject the method through props
  const { queryByText } = render(<Events getEvents={mockGetEvents} />);
  // we look for our event, and should be null
  expect(queryByText(eventsMock[0].title)).toBeNull();
  // the API method should be called once
  expect(mockGetEvents).toHaveBeenCalledTimes(1);
  // we resolve the API method and look for some content
  await wait(() =>
    expect(queryByText(eventsMock[0].title)).toHaveTextContent(
      eventsMock[0].title
    )
  );
});
