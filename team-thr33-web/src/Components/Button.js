import React from 'react';

class Button extends React.Component {
  render() {
    const { onClick, children } = this.props;
    return (
      <button
      className="button"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}

export default Button;
