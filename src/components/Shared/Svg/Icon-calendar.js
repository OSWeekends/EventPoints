import React from 'react';

const IconCalendar = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 100 100"
    className="iconCalendar"
    onClick={onClick}
  >
    <path d="M88.094 14.812H71.239V7a2 2 0 0 0-4 0v7.812H32.761V7a2 2 0 0 0-4 0v7.812H11.906a2 2 0 0 0-2 2V93a2 2 0 0 0 2 2h76.188a2 2 0 0 0 2-2V16.812a2 2 0 0 0-2-2zm-59.333 4v7.812a2 2 0 0 0 4 0v-7.812H67.24v7.812a2 2 0 0 0 4 0v-7.812h14.854v16.605H13.906V18.812h14.855zM13.906 91V39.417h72.188V91H13.906z" />
  </svg>
);

export default IconCalendar;
