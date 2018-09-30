import React, { PureComponent } from 'react';

class Form extends PureComponent  {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      values: {
        ...props.initialValues,
      }
    }
  }

  setValue = (name, val) => {
    this.setState({
      values: {
        ...this.state.values,
        [name]: val,
      }
    })
  }

  onSubmit = fn => () => {
    fn(this.state.values);
  }

  render() {
    return this.props.render({
      setValue: this.setValue,
      values: this.state.values,
      errors: this.state.errors,
      onSubmit: this.onSubmit(this.props.onSubmit),
    })
  }
}

export default Form;
