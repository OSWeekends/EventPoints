import React from 'react';
import './DetailButton.scss';
import IconArrowRight from '../Shared/Svg/Icon-arrow-right';

const DetailButton = ({ onClick, className = '' }) => {
  return (
    <button className={`Button ButtonDetail ${className}`} onClick={onClick}>
      Ver detalles
      <IconArrowRight />
    </button>
  );
};

export default DetailButton;
