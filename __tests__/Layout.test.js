/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import Head from 'next/head';

import App from '../components/Layout.js';

const app = shallow(<App />);
it('renders one <Head> element', () => {
  expect(app.find(Head).length).toBe(1);
});
describe('<Head>', () => {
  const head = app.find(Head);
  it('has one <title>', () => {
    expect(head.find('title').length).toBe(1);
  });
  it('has proper meta viewport', () => {
    const expected = (<meta name="viewport" content="initial-scale=1.0, width=device-width" />);
    expect(head.contains(expected)).toBe(true);
  });
  it('included bootstrap stylesheet', () => {
    const expected = expect.stringMatching(/bootstrap.min.css$/);
    expect(head.find('link[rel="stylesheet"]').prop('href')).toEqual(expected);
  });
});
