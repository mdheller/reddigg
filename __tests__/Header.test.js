/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import { Jumbotron } from 'react-bootstrap';

import App from '../components/Header.js';

describe('With Enzyme', () => {
  const app = shallow(<App />);
  it('shows Reddigg header', () => {
    expect(app.find('h1').text()).toEqual('Reddigg');
  });
  it('renders one <Jumbotron> element', () => {
    expect(app.find(Jumbotron).length).toBe(1);
  });
});
