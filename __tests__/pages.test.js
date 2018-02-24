/* eslint-env jest */
/* global fetch */

import { shallow } from 'enzyme';
import React from 'react';

import Layout from '../components/Layout';
import TopicTable from '../components/TopicTable';

import App from '../pages/pages.js';

let app;
beforeEach(() => {
  app = shallow(<App />);
});

const topics = [];
for (let i = 0; i < 25; i += 1) {
  topics.push({ id: i, title: `test${i}`, score: i });
}

it('renders one <Layout> element', () => {
  expect(app.find(Layout)).toHaveLength(1);
});

it('renders one <TopicTable> element', () => {
  expect(app.find(TopicTable)).toHaveLength(1);
});

describe('getInitialProps', () => {
  it('page 1', async () => {
    fetch.mockResponse(JSON.stringify({ topics }));
    const props = await App.getInitialProps({ req: { protocol: 'http', get: () => 'localhost' }, query: { pageNo: 1 } });
    expect(props).toEqual({ pageNo: 1, topics: topics.slice(0, 20) });
  });
  it('page 2', async () => {
    fetch.mockResponse(JSON.stringify({ topics }));
    const props = await App.getInitialProps({ req: { protocol: 'http', get: () => 'localhost' }, query: { pageNo: 2 } });
    expect(props).toEqual({ pageNo: 2, topics: topics.slice(20, 25) });
  });
  it('shows page 1 when requested page 0', async () => {
    fetch.mockResponse(JSON.stringify({ topics }));
    const props = await App.getInitialProps({ req: { protocol: 'http', get: () => 'localhost' }, query: { pageNo: 0 } });
    expect(props).toEqual({ pageNo: 1, topics: topics.slice(0, 20) });
  });
  it('shows page 2 when requested page 5', async () => {
    fetch.mockResponse(JSON.stringify({ topics }));
    const props = await App.getInitialProps({ req: { protocol: 'http', get: () => 'localhost' }, query: { pageNo: 5 } });
    expect(props).toEqual({ pageNo: 2, topics: topics.slice(20, 25) });
  });
  it('shows page 1 when no query', async () => {
    fetch.mockResponse(JSON.stringify({ topics }));
    const props = await App.getInitialProps({ req: { protocol: 'http', get: () => 'localhost' }, query: {} });
    expect(props).toEqual({ pageNo: 1, topics: topics.slice(0, 20) });
  });
  it('without req page 2', async () => {
    fetch.mockResponse(JSON.stringify({ topics }));
    const props = await App.getInitialProps({ query: { pageNo: 2 } });
    expect(props).toEqual({ pageNo: 2, topics: topics.slice(20, 25) });
  });
});
