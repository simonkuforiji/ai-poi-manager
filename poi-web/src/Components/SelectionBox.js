import React, { useState } from 'react';
import Input from './Input'; // Assuming the Input component is in the same folder
import Button from './Button';
import { CgAdd } from 'react-icons/cg';

const SelectionBox = (
  { title, options, onSelect, button_children, onSubmit, subtitle }
) => {
  const [selected, setSelected] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [showSelect, setShowSelect] = useState(true);

  const handleOnSubmit = () => {
    setShowSelect(!showSelect);
    onSubmit();
  }

  const handleBubbleClick = (option) => {
    setSelected(option);
    setInputValue(option); // Update input field to match selection
    onSelect(option);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setSelected(null); // Deselect bubbles when user types manually
    onSelect(value);
  };

  const toggeSelection = () => {
    setShowSelect(!showSelect);
  }

  return (
    <div className="selection-box">
    <div className="selection-heading-box">
      <h2 className="selection-heading">{title}</h2>
      <h4 className="selection-subheading">{subtitle}</h4>
      <CgAdd  size={30} style={{ color: '#007bff' }} onClick={toggeSelection}/>
    </div>
    <br />
    <div className={!showSelect ? "hide-div": ''}>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type or select an option..."
      />
      <div className="bubble-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`bubble ${selected === option ? 'selected' : ''}`}
            onClick={() => handleBubbleClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <br />
      <br />
      <Button children={button_children} onClick={handleOnSubmit} />
    </div>
    </div>
  );
};

export default SelectionBox;
