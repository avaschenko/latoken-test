import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

class PSelect extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    const {value} = nextProps;
    return value !== this.props.value;
  }

  render() {
    return (
      <div>
        <Select {...this.props}>
          {this.props.list.map(item => (
            <Option key={item.id} value={item.id}>{item.label}</Option>
          ))}
        </Select>
      </div>
    )
  }
}

PSelect.defaultProps = {
  list: [],
  onChange: () => {},
}

export default PSelect;
