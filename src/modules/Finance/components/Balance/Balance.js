import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import s from './Balance.css';
import * as selectors from "../../selectors"
import { normalizeNumber } from "modules/utils";
import * as types from '../../actionTypes';

class Balance extends PureComponent {

  render() {
    const { amount, label } = this.props;
    return (
      <span className={cx({
        [s.root]: true,
        [s.negative]: amount < 0,
      })}>{label} {amount < 0 ? amount * -1 : amount}</span>
    )
  }
}
Balance.defaultProps = {
  amount: 0,
  label: 'usd',
}

Balance.propTypes = {
  amount: PropTypes.number,
  label: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    amount: selectors.total(state[types.name]),
    label: selectors.getActiveCurrencyLabel(state[types.name]),
  }
}
export default connect(mapStateToProps, {})(Balance);
