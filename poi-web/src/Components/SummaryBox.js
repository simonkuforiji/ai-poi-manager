import React from 'react';
import Button from './Button';

const SummaryBox = ({ title, text, onClick, button_children }) => {
  return (
    <div className="summary-box">
      <h2 className="summary-heading">{title}</h2>
      <p className="summary-text">{text}</p>
      <br />
      <br />
      <Button children={button_children} onClick={onClick} />
    </div>
  );
};

export default SummaryBox;
