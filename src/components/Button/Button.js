import React from 'react';
import {Button} from 'react-bootstrap';

const PButton = props => (
  <Button bsStyle="primary" {...props}>
    {props.children}
  </Button>
);

export default PButton;
