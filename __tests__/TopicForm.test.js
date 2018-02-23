/* eslint-env jest */
import { shallow } from 'enzyme';
import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import sinon from 'sinon';

import App from '../components/TopicForm';
import AlertDismissable from '../components/AlertDismissable';

const handleChangeSpy = sinon.spy(App.prototype, 'handleChange');
const submitSpy = sinon.spy(App.prototype, 'submit');
let app;

beforeEach(() => {
  app = shallow(<App />);
  handleChangeSpy.resetHistory();
  submitSpy.resetHistory();
});

it('has one hidden <AlertDismissable>', () => {
  expect(app.find(AlertDismissable).html()).toBe('');
});

describe('<form>', () => {
  it('has one <form>', () => {
    expect(app.find('form')).toHaveLength(1);
  });
  describe('onSubmit', () => {
    it('does not submit if validation failed', () => {
      const reloadSpy = sinon.spy(App, 'reload');
      app.setState({ title: '1'.repeat(256) });
      app.find('form').simulate('submit', { preventDefault() {} });
      expect(reloadSpy.calledOnce).toBe(false);
      reloadSpy.restore();
    });
    it('shows alert when connection failed', () => {
      app.find('form').simulate('submit', { preventDefault() {} });
      expect(submitSpy.calledOnce).toBe(true);
      expect(app.find(AlertDismissable).prop('text')).toBe('No connection. Please try again!');
    });
    it('shows alert if server returns unsuccessful', () => {
      const server = sinon.fakeServer.create();
      server.respondImmediately = true;
      server.respondWith('POST', '/new', [400, { 'Content-Type': 'application/json' }, JSON.stringify({ success: false })]);
      app.find('form').simulate('submit', { preventDefault() {} });
      server.restore();
      expect(submitSpy.calledOnce).toBe(true);
      expect(app.find(AlertDismissable).prop('text')).toBe('Submission failed. Please try again!');
    });
    it('when successful', () => {
      const reloadSpy = sinon.spy(App, 'reload');
      const server = sinon.fakeServer.create();
      server.respondImmediately = true;
      server.respondWith('POST', '/new', [200, { 'Content-Type': 'application/json' }, JSON.stringify({ success: true })]);
      app.find('form').simulate('submit', { preventDefault() {} });
      server.restore();
      expect(submitSpy.calledOnce).toBe(true);
      expect(reloadSpy.calledOnce).toBe(true);
      expect(app.find(AlertDismissable).html()).toBe('');
      reloadSpy.restore();
    });
  });
});

it('has one <FormGroup>', () => {
  expect(app.find(FormGroup)).toHaveLength(1);
});
it('has one <ControlLabel>', () => {
  expect(app.find(ControlLabel)).toHaveLength(1);
});
describe('has one <FormControl>', () => {
  let formcontrol;
  beforeEach(() => {
    formcontrol = app.find(FormControl);
  });
  it('has only one', () => {
    expect(formcontrol).toHaveLength(1);
  });
  it('has correct placeholder', () => {
    expect(formcontrol.prop('placeholder')).toBe('Enter title');
  });
  it('is empty string', () => {
    expect(formcontrol.prop('value')).toBe('');
  });
  it('responds to change', () => {
    formcontrol.simulate('change', { target: { name: 'TopicForm', value: 'asd' } });
    expect(handleChangeSpy.calledOnce).toBe(true);
    expect(app.state('title')).toBe('asd');
  });
});

it('has one <FormControl.Feedback>', () => {
  expect(app.find(FormControl.Feedback)).toHaveLength(1);
});

describe('<HelpBlock>', () => {
  it('has one', () => {
    expect(app.find(HelpBlock)).toHaveLength(1);
  });
  it('has the correct content', () => {
    expect(app.find(HelpBlock).children().text()).toBe('Title is at most 255 characters long');
  });
});

describe('<Button>', () => {
  let button;
  beforeEach(() => {
    button = app.find(Button);
  });
  it('has one', () => {
    expect(button).toHaveLength(1);
  });
  it('has the correct label', () => {
    expect(button.children().text()).toBe('Submit');
  });
});
