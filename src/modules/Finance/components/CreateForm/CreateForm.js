import React, { Component } from 'react';
import { Button } from 'antd';
import Input from 'components/Input/Input';
import Select from 'components/Select/Select';
import { amountRegexp } from 'modules/constants';
import cx from 'classnames';
import Form from 'components/Form/Form';
import s from './CreateForm.css';
import { connect } from 'react-redux';
import * as selectors from '../../selectors';
import * as types from '../../actionTypes';


class F extends Component {

  handleChangeOperation = key => this.props.setValue('type', key);
  handleCurrencyChange = key => this.props.setValue('currency', key)
  handleAmountChange = ev => {
    const { value } = ev.target;

    if((!isNaN(value) && amountRegexp.test(value)) || value === '') {
      this.props.setValue('amount', ev.target.value)
    }
  }

  handleSubmit = ev => {
    ev.preventDefault();
    this.props.onSubmit();
  }

  handleDescriptionChange = ev => this.props.setValue('description', ev.target.value);

  operations = [{ id: 'income', label: 'income' }, { id: 'expense', label: 'expense' }];

  render() {
    const { values, errors } = this.props;
    return (
      <form
        className={cx([
          s.root,
          this.props.className,
        ])}>
        <div className={s.select}>
          <Select
            defaultValue="income"
            list={this.operations}
            value={values.type}
            onChange={this.handleChangeOperation}
          />
        </div>
        <div className={s.select}>
          <Select
            defaultValue="usd"
            onChange={this.handleCurrencyChange}
            list={this.props.currencies}
          />
        </div>
        <div className={s.input}>
          <Input
            type="text"
            value={values.amount}
            placeholder="100.00"
            onChange={this.handleAmountChange}
          />
          {errors.amount}
        </div>
        <div className={cx([s.descr, s.input])}>
          <Input
            value={values.description}
            onChange={this.handleDescriptionChange}
            type="text"
            placeholder="Some description"
          />
          {errors.description}
        </div>
        <Button
          loading={this.props.isLoading}
          disabled={values.amount.length === 0 || values.description.length === 0
          }
          onClick={this.handleSubmit}
          type="submit"
        >
          Add
        </Button>
      </form>
    )
  }
}
const CreateForm = props => (
  <Form
    initialValues={{
      amount: '',
      description: '',
      type: 'income',
      currency: 'usd',
    }}
    onSubmit={props.handleSubmit}
    render={data => (
      <F
        {...data}
        {...props}
      />
    )}
  />
);


CreateForm.defaultProps = {
  className: '',
}
const mapStateToProps = state => {
  return {
    currencies: selectors.currenciesList(state[types.name]),
    isLoading: selectors.formLoading(state[types.name]),
  }
}

export default connect(mapStateToProps, {})(CreateForm);

