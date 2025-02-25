import React, { useState } from 'react';
import Input from './Input'; // Assuming the Input component is in the same folder
import Button from './Button';
import { CgAdd } from 'react-icons/cg';

const SelectionBoxTwo = (
  { title, options, updateOptions, onSelect, button_children, onSubmit }
) => {
  const [selected, setSelected] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [showSelect, setShowSelect] = useState(true);

  const handleBubbleClick = (option) => {
    setSelected(option);
    setInputValue(option); // Update input field to match selection
    onSelect(option);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setSelected(null); // Deselect bubbles when user types manually
  };

  const handleInputSubmit = () => {
    onSelect(inputValue);
    if (!options.includes(inputValue)) {
      updateOptions(inputValue);
    }
  };

  const toggeSelection = () => {
    setShowSelect(!showSelect);
  }

  return (
    <div className="selection-box">
    <div className="selection-heading-box">
      <h2 className="selection-heading">{title}</h2>
      <CgAdd  size={30} style={{ color: '#007bff' }} onClick={toggeSelection}/>
    </div>
    <br />
    <div className={!showSelect ? "hide-div": ''}>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type or select an option..."
      />
      <CgAdd className="add-poi-icon"  size={30} style={{ color: '#007bff' }} onClick={handleInputSubmit}/>
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
      <Button children={button_children} onClick={onSubmit} />
    </div>
    </div>
  );
};

export default SelectionBoxTwo;
