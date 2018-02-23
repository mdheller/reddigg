import { Alert, Button } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';

class AlertDismissable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleDismiss = this.handleDismiss.bind(this);
  }
  handleDismiss() {
    this.props.show = false;
  }
  render() {
    if (this.props.show) {
      return (
        <Alert bsStyle={this.props.bsStyle} onDismiss={this.handleDismiss}>
          <p>{this.props.text}</p>
          <p>
            <Button onClick={this.handleDismiss}>Dismiss</Button>
          </p>
        </Alert>
      );
    }
    return null;
  }
}
AlertDismissable.propTypes = {
  show: PropTypes.bool,
  bsStyle: PropTypes.string,
  text: PropTypes.string,
};
AlertDismissable.defaultProps = {
  show: false,
  bsStyle: 'danger',
  text: 'An error occured',
};
export default AlertDismissable;
