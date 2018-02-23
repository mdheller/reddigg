/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import { Table } from 'react-bootstrap';

import Layout from '../components/Layout';
import TopicForm from '../components/TopicForm';

import App from '../pages/index.js';

const app = shallow(<App />);
it('renders one <Layout> element', () => {
  expect(app.find(Layout)).toHaveLength(1);
});
it('renders one <TopicForm> element', () => {
  expect(app.find(TopicForm)).toHaveLength(1);
});
it('renders one <Table> element', () => {
  expect(app.find(Table)).toHaveLength(1);
});
