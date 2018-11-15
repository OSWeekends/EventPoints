import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { eventMock } from './EventMock';
import Event from './Event';

test('Event has basic info', async () => {
  const mockOnSelect = jest.fn();
  const { getByText } = render(
    <Event event={eventMock} onSelect={mockOnSelect} />
  );
  getByText(eventMock.title);
  getByText(eventMock.abstract);
});

test('Test click on Detail Button', async () => {
  const mockOnSelect = jest.fn();
  const { container } = render(
    <Event event={eventMock} onSelect={mockOnSelect} />
  );
  const DetailButton = container.querySelector('.ButtonDetail');
  expect(mockOnSelect).toHaveBeenCalledTimes(0);
  fireEvent.click(DetailButton);
  expect(mockOnSelect).toHaveBeenCalledTimes(1);
});
