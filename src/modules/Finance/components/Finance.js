import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Toolbar from './Toolbar/Toolbar';
import Records from './Records/Records';
import CreateForm from './CreateForm/CreateForm';
import * as actions from '../actions';

import s from './Finance.css';

class Finance extends PureComponent {

  handleSubmit = (values) => {
    this.props.add({
      ...values,
      type: values.type.toLowerCase(),
      date: Date.now(),
    })
  };

  render() {
    return (
      <div>
        <CreateForm
          handleSubmit={this.handleSubmit}
          className={s.form}
        />

        <Toolbar />
        <Records />
      </div>
    )
  }
}

export default connect(
  null,
  {
    add: actions.addRecord,
})(Finance);
