import React, { Component } from 'react';
import { Input } from 'antd';

class PInput extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    const { value } = nextProps;
    return value !== this.props.value;
  }

  render() {
    return (
      <div>
        <Input {...this.props} />
      </div>
    )
  }
}

PInput.defaultProps = {
  onChange: () => {},
}
export default PInput;
