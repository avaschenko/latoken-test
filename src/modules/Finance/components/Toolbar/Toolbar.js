import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'components/Select/Select';
import Input from 'components/Input/Input';
import cx from 'classnames';
import s from './Toolbar.css';
import { connect } from 'react-redux';
import * as selectors from "../../selectors"
import { ratioRegexp } from "modules/constants"
import * as types from '../../actionTypes';
import * as actions from '../../actions';

class Toolbar extends PureComponent {
  constructor() {
    super();
    this.timerId = null;
    this.state = {
      ratio: '1.114',
      currency: 'usd',
    }
  }
  handleChangeCurrency = id => this.props.setCurrency(id);

  handleChangeRatio = (ev) => {
    clearTimeout(this.timerId);
    const {value} = ev.target;
    const { setRatio } = this.props;
    if ((!isNaN(value) && ratioRegexp.test(value)) || value === '') {
      this.setState({
        ratio: value,
      })
      this.timerId = setTimeout(() => {
        setRatio(value)
      }, 300);
    }
  }

  render() {
    if(this.props.records.ids.length === 0) return null;
    return (
      <div className={cx([
        s.root,
        this.props.className,
      ])}>
        <span className={s.label}>
          Display amounts in
        </span>
        <div className={s.select}>
          <Select
            defaultValue="usd"
            onChange={this.handleChangeCurrency}
            list={this.props.currencies}
          />
        </div>
        <span className={s.relation}>
          € → $
        </span>
        <div className={s.input}>
          <Input
            type="text"
            onChange={this.handleChangeRatio}
            value={this.state.ratio}
          />
        </div>
      </div>
    )
  }
}

Toolbar.defaultProps = {
  className: '',
}

Toolbar.propTypes = {
  className: PropTypes.string,
  currency: PropTypes.string,
}

const mapStateToProps = state => ({
  currencies: selectors.currenciesList(state[types.name]),
  records: selectors.records(state[types.name])
})

export default connect(
  mapStateToProps,
  { setCurrency: actions.setCurrency, setRatio: actions.setRatio}
)(Toolbar);
