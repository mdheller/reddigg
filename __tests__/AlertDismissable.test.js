/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import { Alert, Button } from 'react-bootstrap';

import App from '../components/AlertDismissable';


it('is by default hidden', () => {
  const app = shallow(<App />);
  expect(app.text()).toBe('');
});

let app;
beforeEach(() => {
  app = shallow(<App />);
  app.setProps({ show: true });
});

it('contains one <Alert> element', () => {
  expect(app.find(Alert)).toHaveLength(1);
});

describe('<Alert>', () => {
  it('contains dismiss button', () => {
    expect(app.find(Alert).find(Button).children().text()).toBe('Dismiss');
  });
  it('has a text following its props', () => {
    app.setProps({ text: 'abc' });
    expect(app.find(Alert).find('p').map(e => e.text()).filter(e => e === 'abc')).toHaveLength(1);
  });
  it('Dismiss button works', () => {
    const button = app.find(Alert).find(Button);
    button.simulate('click');
    expect(app.text()).toBe('');
  });
});
