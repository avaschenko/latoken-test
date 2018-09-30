import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import * as selectors from '../../selectors';
import * as types from '../../actionTypes';
import * as actions from '../../actions';
import s from './Records.css';
import List from './List';
import Balance from '../Balance/Balance';

class Records extends PureComponent {

  componentDidMount() {
    this.props.fetchFinaces();
  }

  render() {
    if(this.props.isLoading) return <div className={s.loader}><Spin size="large"/></div>
    return (
      <div>
        {this.props.records.ids.length === 0 ? (
          <p className={s.noRecords}>
            Add Some Financial Records
          </p>
        ) : (
          <div>
            <table className={s.table}>
              <colgroup>
                <col width="5%"/>
                <col width="50%"/>
                <col width="20%"/>
                <col width="20%"/>
                <col width="5%"/>
              </colgroup>
              <List
                ids={this.props.records.ids}
                source={this.props.records.data}
              />
             <tfoot className={s.balance}>
                <tr>
                  <td />
                  <td />
                  <td className={s.label}>
                    <b>Balance</b>
                  </td>
                  <td>
                    <Balance />
                  </td>
                </tr>
             </tfoot>
            </table>
          </div>
        )}
      </div>
    )
  }
}




const mapStateToProps = state => ({
  records: selectors.records(state[types.name]),
  isLoading: selectors.loading(state[types.name]),
})

export default connect(
  mapStateToProps,
  {
    fetchFinaces: actions.fetchFinaces,
  }
)(Records);
