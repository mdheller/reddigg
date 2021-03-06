/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import { Jumbotron } from 'react-bootstrap';

import App from '../components/Header.js';

let app;
beforeEach(() => {
  app = shallow(<App />);
});

it('renders one <Jumbotron> element', () => {
  expect(app.find(Jumbotron)).toHaveLength(1);
});

describe('Inside the <Jumbotron>', () => {
  let jumbotron;
  beforeEach(() => {
    jumbotron = app.find(Jumbotron);
  });

  it('shows Reddigg header', () => {
    expect(jumbotron.find('h1').text()).toEqual('Reddigg');
  });
  it('provides at least one description', () => {
    expect(jumbotron.find('p').length).toBeGreaterThan(0);
  });
});
