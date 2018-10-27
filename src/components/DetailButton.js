import React from 'react';
import './DetailButton.scss';

const DetailButton = ({onClick, className = ''}) => {
  return (
    <button className={`Button ButtonDetail ${className}`} onClick={onClick}>Ver detalles
      <span>
        <svg className="icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m13.25 10-7.141-7.42a.697.697 0 0 1 0-.979.68.68 0 0 1 .969 0l7.83 7.908a.697.697 0 0 1 0 .979l-7.83 7.908c-.268.271-.701.27-.969 0s-.268-.707 0-.979z" /></svg>
      </span>
    </button>
  )
}

export default DetailButton;
