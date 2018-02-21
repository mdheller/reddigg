/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import Layout from '../components/Layout.js';

import App from '../pages/index.js';

const app = shallow(<App />);
it('renders one <Layout> element', () => {
  expect(app.find(Layout).length).toBe(1);
});
