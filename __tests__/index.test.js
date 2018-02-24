/* eslint-env jest */
/* global fetch */

import { shallow } from 'enzyme';
import React from 'react';

import Layout from '../components/Layout';
import TopicForm from '../components/TopicForm';
import TopicTable from '../components/TopicTable';

import App from '../pages/index.js';

const topics = [{ id: 0, title: 'abc', score: 0 }, { id: 1, title: 'asd', score: 1 }];

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

describe('getInitialProps', () => {
  it('with req', async () => {
    fetch.mockResponse(JSON.stringify({ topics }));
    const props = await App.getInitialProps({ req: { protocol: 'http', get: () => 'localhost' } });
    expect(props).toEqual({ topics });
  });
  it('empty req', async () => {
    fetch.mockResponse(JSON.stringify({ topics }));
    const props = await App.getInitialProps({});
    expect(props).toEqual({ topics });
  });
});
