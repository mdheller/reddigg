/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';
import { Table } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import sinon from 'sinon';

import AlertDismissable from '../components/AlertDismissable';

import App from '../components/TopicTable';

let app;
const topics = [{ id: 0, title: 'abc', score: 0 }, { id: 1, title: 'asd', score: 1 }];
global.fetch = require('jest-fetch-mock');

beforeEach(() => {
  app = shallow(<App topics={topics} />);
});

it('renders one <Table> element', () => {
  expect(app.find(Table)).toHaveLength(1);
});

it('renders topics properly', () => {
  expect(app.find('tbody').find('tr')).toHaveLength(2);
});

describe('upvote', () => {
  let upvote;
  beforeEach(() => {
    upvote = app.find('tbody').find(FontAwesome).at(0).parent();
  });
  it('properly', () => {
    const server = sinon.createFakeServer();
    server.respondImmediately = true;
    server.respondWith('PUT', '/upvote/0', [200, { 'Content-Type': 'application/json' }, JSON.stringify({ success: true })]);
    const reloadSpy = sinon.spy(App, 'reload');
    upvote.simulate('click');
    server.restore();
    expect(reloadSpy.calledOnce).toBe(true);
    reloadSpy.restore();
  });
  it('failure', () => {
    const server = sinon.createFakeServer();
    server.respondImmediately = true;
    server.respondWith('PUT', '/upvote/0', [400, { 'Content-Type': 'application/json' }, JSON.stringify({ success: false })]);
    upvote.simulate('click');
    server.restore();
    expect(app.find(AlertDismissable).prop('text')).toBe('upvote failed. Please try again!');
  });
  it('no connection', () => {
    upvote.simulate('click');
    expect(app.find(AlertDismissable).prop('text')).toBe('No connection. Please try again!');
  });
});

describe('getInitialProps', () => {
  it('with req', async () => {
    global.fetch.mockResponse(JSON.stringify({ topics }));
    const props = await App.getInitialProps({ req: { protocol: 'http', get: () => 'localhost' } });
    expect(props).toEqual({ topics });
  });
  it('empty req', async () => {
    global.fetch.mockResponse(JSON.stringify({ topics }));
    const props = await App.getInitialProps({});
    expect(props).toEqual({ topics });
  });
});
