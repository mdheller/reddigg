/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import { Jumbotron } from 'react-bootstrap';

import App from '../components/Header.js';

describe('With Enzyme', () => {
  const app = shallow(<App />);
  it('renders one <Jumbotron> element', () => {
    expect(app.find(Jumbotron).length).toBe(1);
  });
  describe('Inside the <Jumbotron>', () => {
    const jumbotron = app.find(Jumbotron);
    it('shows Reddigg header', () => {
      expect(jumbotron.find('h1').text()).toEqual('Reddigg');
    });
    it('provides at least one description', () => {
      expect(jumbotron.find('p').length).toBeGreaterThan(0);
    });
  })
});
