import React, { PureComponent } from 'react';
import StatusArrow from '../StatusArrow/StatusArrow';
import OperationInfo from '../OperationInfo/OperationInfo';
import Currencies from '../Currencies/Currencies';
import { connect } from 'react-redux';
import s from './Records.css';
import * as selectors from '../../selectors';
import * as types from '../../actionTypes';
import * as actions from '../../actions';

class List extends PureComponent {
  handleRemove = (id) => () => this.props.remove({ id });

  render() {
    const { ids, source } = this.props;
    return (
      <tbody>
      {ids.map((id, index) => (
        <tr key={id}>
          <td
            key={`${id}-${index}-status`}
            className={s.td}
            style={{verticalAlign: 'middle'}}>
            <StatusArrow
              type={source[id].type}
            />
          </td>
          <td
            key={`${id}-${index}-info`}
            className={s.td}
          >
            <OperationInfo
              description={source[id].description}
              date={source[id].date}
            />
          </td>
          <td
            key={`${id}-${index}-expense`}
            className={s.td}
          >
            <Currencies
              ratio={this.props.ratio}
              currenciesList={this.props.balances[id]}
              currentCurrency={this.props.activeCurrency}
              isEmpty={source[id].type === 'income'}
            />
          </td>
          <td
            key={`${id}-${index}-income`}
            className={s.td}
          >
            <Currencies
              ratio={this.props.ratio}
              currenciesList={this.props.balances[id]}
              currentCurrency={this.props.activeCurrency}
              isEmpty={source[id].type === 'expense'}
            />
          </td>
          <td
            onClick={this.handleRemove(id)}
            key={`${id}-${index}-delete`}
            className={s.delete}
          >
            ✕
          </td>
        </tr>
      ))}
      </tbody>

    )
  }
}

const mapStateToProps = state => ({
  balances: selectors.balances(state[types.name]),
  activeCurrency: selectors.activeCurrency(state[types.name]),
  ratio: selectors.ratio(state[types.name]),

})
export default connect(
  mapStateToProps,
  { remove: actions.deleteRecord }
)(List);
