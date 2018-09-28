import React, { Component } from 'react';
import { DropdownButton, MenuItem, FormControl, Button } from 'react-bootstrap';
import s from './CreateForm.css';
import cx from 'classnames';

class CreateForm extends Component {

  render() {
    return (
      <form className={cx([
        s.root,
      ])}>
        <DropdownButton
          title="Тип баланса"
        >
          <MenuItem eventKey="1">Expense</MenuItem>
          <MenuItem eventKey="2">Income</MenuItem>
        </DropdownButton>
        <DropdownButton
          title="Тип валюты"
        >
          <MenuItem eventKey="1">$</MenuItem>
          <MenuItem eventKey="2">€</MenuItem>
        </DropdownButton>
        <FormControl
          type="text"
        />
        <FormControl
          type="text"
        />
        <Button
          bsStyle="primary"
          type="submit"
        >
          Add
        </Button>
      </form>
    )
  }
}

export default CreateForm;
