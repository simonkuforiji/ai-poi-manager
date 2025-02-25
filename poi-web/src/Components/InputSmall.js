import React from 'react';

class InputSmall extends React.Component {
  state = {
    newValue: '',
  };

  componentDidMount() {
    const { value } = this.props;
    this.onChange(value);
  }

  onChange = newValue => {
    const { onChange } = this.props;
    this.setState({
      newValue,
    }, () => {
      onChange({ target: { value: newValue } });
    });
  }

  render() {
    const {
      onChange, value, placeholder, name, divClassName,
    } = this.props;

    return (
      <div id="small-input-div" className={divClassName}>
        <input
          className="small-input"
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          name={name}
        />
      </div>
    );
  }
}

export default InputSmall;
