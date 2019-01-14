import React from 'react';

const IconClock = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="icon"
    onClick={onClick}
  >
    <path d="M50 5C25.187 5 5 25.187 5 50s20.187 45 45 45 45-20.187 45-45S74.813 5 50 5zm0 86C27.393 91 9 72.607 9 50S27.393 9 50 9s41 18.393 41 41-18.393 41-41 41z" />
    <path d="M51.874 49.171V21.148a2 2 0 0 0-4 0V50a2 2 0 0 0 .586 1.414l21.009 21.009c.391.391.902.586 1.414.586s1.023-.195 1.414-.586a2 2 0 0 0 0-2.828L51.874 49.171z" />
  </svg>
);

export default IconClock;
