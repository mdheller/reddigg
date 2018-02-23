/* eslint-env jest */

import request from 'supertest';

import backend from '../backend';

const requestAndParse = async (method, url, payload = {}) => {
  let response;
  switch (method) {
    case 'get':
      response = await request(backend).get(url);
      break;
    case 'post':
      response = await request(backend).post(url).send(payload);
      break;
    case 'put':
      response = await request(backend).put(url);
      break;
    default:
      break;
  }
  return { statusCode: response.statusCode, text: JSON.parse(response.text) };
};

const expectSuccess = async (response) => {
  expect(response.statusCode).toBe(200);
  expect(response.text.success).toBe(true);
};

const expectFailure = async (response) => {
  expect(response.statusCode).toBe(400);
  expect(response.text.success).toBe(false);
};

describe('GET /', () => {
  it('should respond with 200 OK with welcome message', async () => {
    const response = await requestAndParse('get', '/');
    expect(response.statusCode).toBe(200);
    expect(response.text.message).toBe('Welcome to the reddigg back-end!');
  });
});

describe('GET /all', () => {
  it('should return all topics', async () => {
    const response = await requestAndParse('get', '/all');
    expectSuccess(response);
    expect(response.text.topics).toBeDefined();
  });
});

describe('POST /new', () => {
  it('should save the new topic', async () => {
    const response = await requestAndParse('post', '/new', { title: 'qwerty' });
    expectSuccess(response);
    const { topics } = (await requestAndParse('get', '/all')).text;
    expect(topics).toHaveLength(1);
    expect(topics[0].title).toBe('qwerty');
  });
  it('should reject invalid request', async () => {
    const response = await requestAndParse('post', '/new', { title: '1'.repeat(256) });
    expectFailure(response);
  });
  it('should reject empty request', async () => {
    const response = await requestAndParse('post', '/new');
    expectFailure(response);
    expect(response.text.error).toBe('Empty request');
  });
});

describe('PUT /upvote', () => {
  it('should upvote a valid topic', async () => {
    const response = await requestAndParse('put', '/upvote/0');
    expectSuccess(response);
    const { topics } = (await requestAndParse('get', '/all')).text;
    expect(topics[0].score).toBe(1);
  });
  it('should reject invalid topic id', async () => {
    const response = await requestAndParse('put', '/upvote/1');
    expectFailure(response);
  });
});

describe('PUT /downvote', () => {
  it('should downvote a valid topic', async () => {
    const response = await requestAndParse('put', '/downvote/0');
    expectSuccess(response);
    const { topics } = (await requestAndParse('get', '/all')).text;
    expect(topics[0].score).toBe(0);
  });
  it('should reject invalid topic id', async () => {
    const response = await requestAndParse('put', '/downvote/1');
    expectFailure(response);
  });
});

describe('non-existent methods', () => {
  const check404 = method => async () => {
    const response = await requestAndParse(method, '/asd');
    expect(response.statusCode).toBe(404);
    expect(response.text.success).toBe(false);
    expect(response.text.error).toBe('No method');
  };
  it('should return HTTP 404 at unknown GET', check404('get'));
  it('should return HTTP 404 at unknown PUT', check404('put'));
  it('should return HTTP 404 at unknown POST', check404('post'));
});
