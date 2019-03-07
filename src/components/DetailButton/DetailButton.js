import React from 'react';
import './DetailButton.scss';
import IconArrowRight from '../Shared/Svg/Icon-arrow-right';

const DetailButton = ({ className = '', onSelect }) => {
  return (
    <button className={`Button ButtonDetail ${className}`} onClick={onSelect}>
      Ver detalles
      <IconArrowRight />
    </button>
  );
};

export default DetailButton;
