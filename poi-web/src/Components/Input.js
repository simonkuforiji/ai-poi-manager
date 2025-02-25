import React from 'react';

class Input extends React.Component {
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
      onChange, value, placeholder, name
    } = this.props;

    return (
      <div id="input-div">
        <input
          className="input"
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          name={name}
        />
      </div>
    );
  }
}

export default Input;
