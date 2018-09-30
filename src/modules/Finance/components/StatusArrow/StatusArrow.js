import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import s from './StatusArrow.css';


class StatusArrow extends PureComponent {
  render() {
    return (
      this.props.type === 'income' ?
        <span className={s.income}><Icon type="arrow-up" theme="outlined"/></span> :
        <span className={s.expense}><Icon type="arrow-down" theme="outlined"/></span>
    )
  }
}

export default StatusArrow;
