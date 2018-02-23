/* eslint-env browser */
import { Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import React from 'react';
import $ from 'jquery';

import AlertDismissable from './AlertDismissable';

class TopicForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      title: '',
      alertShow: false,
    };
  }
  getValidationState() {
    const { length } = this.state.title;
    if (length <= 255) return null;
    return 'error';
  }
  handleChange(e) {
    this.setState({ title: e.target.value });
  }
  submit(e) {
    e.preventDefault();
    if (this.getValidationState() !== 'error') {
      $.post('/new', { title: this.state.title })
        .done((msg) => {
          if (msg.success) {
            window.location.replace(window.location.href);
          } else {
            this.setState({ alertText: 'Failed to submit page. Please try again!', alertShow: true });
          }
        })
        .fail(() => {
          this.setState({ alertText: 'Connection failed. Please try again!', alertShow: true });
        });
    }
  }
  render() {
    return (
      <div>
        <AlertDismissable show={this.state.alertShow} text={this.state.alertText} />
        <form onSubmit={this.submit}>
          <FormGroup controlId="TopicForm" validationState={this.getValidationState()}>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              value={this.state.title}
              placeholder="Enter title"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Title is at most 255 characters long</HelpBlock>
            <Button type="submit">Submit</Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default TopicForm;
