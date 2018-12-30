import React from 'react';
import './DetailButton.scss';
import IconArrowRight from '../Shared/Svg/Icon-arrow-right';

const DetailButton = ({ className = '' }) => {
  return (
    <button className={`Button ButtonDetail ${className}`}>
      Ver detalles
      <IconArrowRight />
    </button>
  );
};

export default DetailButton;
