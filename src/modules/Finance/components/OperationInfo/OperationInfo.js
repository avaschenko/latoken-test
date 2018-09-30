import PropTypes from 'prop-types';
import {List} from 'antd';

import React, { PureComponent } from 'react';

class OperationInfo extends PureComponent {


  render() {
    return (
      <List
        itemLayout="horizontal"
      >
        <List.Item>
          <List.Item.Meta
            title={this.props.description}
            description={this.props.date}
          />
        </List.Item>
      </List>
    )
  }
}

OperationInfo.defaultProps = {
  description: '',
  date: '',
}

OperationInfo.propTypes = {
  description: PropTypes.string,
  date: PropTypes.string,
}

export default OperationInfo;
