/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';

import Layout from '../components/Layout';
import TopicForm from '../components/TopicForm';
import TopicTable from '../components/TopicTable';

import App from '../pages/index.js';

let app;
beforeEach(() => {
  app = shallow(<App />);
});

it('renders one <Layout> element', () => {
  expect(app.find(Layout)).toHaveLength(1);
});

it('renders one <TopicForm> element', () => {
  expect(app.find(TopicForm)).toHaveLength(1);
});

it('renders one <TopicTable> element', () => {
  expect(app.find(TopicTable)).toHaveLength(1);
});
