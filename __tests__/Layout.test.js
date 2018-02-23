/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import Head from 'next/head';

import App from '../components/Layout';

const app = shallow(<App />);
it('renders one <Head> element', () => {
  expect(app.find(Head)).toHaveLength(1);
});
describe('<Head>', () => {
  const head = app.find(Head);
  it('has one <title>', () => {
    expect(head.find('title')).toHaveLength(1);
  });
  it('has proper meta viewport', () => {
    const expected = (<meta name="viewport" content="initial-scale=1.0, width=device-width" />);
    expect(head.contains(expected)).toBe(true);
  });
  describe('Stylesheet', () => {
    const stylesheets = head.find('link[rel="stylesheet"]').map(e => e.prop('href'));
    it('includes bootstrap stylesheet', () => {
      expect(stylesheets
        .filter(a => a.match(/bootstrap.min.css$/)))
        .toHaveLength(1);
    });
    it('includes fontawesome stylesheet', () => {
      expect(stylesheets
        .filter(a => a.match(/font-awesome.min.css$/)))
        .toHaveLength(1);
    });
  });
});
