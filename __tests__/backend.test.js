/* eslint-env jest */

import request from 'supertest';

import backend from '../backend';

describe('GET /', () => {
  it('should respond with 200 OK with welcome message', async () => {
    const response = await request(backend).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Welcome to the reddigg back-end!');
  });
});

describe('GET /all', () => {
  it('should return all topics', async () => {
    const response = await request(backend).get('/all');
    const parsed = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(parsed.topics).toBeDefined();
  });
});

describe('POST /new', () => {
  it('should save the new topic', async () => {
    const response = await request(backend).post('/new').send({ title: 'qwerty' });
    const parsed = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(parsed.success).toBe(true);
    const { topics } = JSON.parse((await request(backend).get('/all')).text);
    expect(topics).toHaveLength(1);
    expect(topics[0].title).toBe('qwerty');
  });
  it('should reject invalid request', async () => {
    const response = await request(backend).post('/new').send({ title: '1'.repeat(256) });
    const parsed = JSON.parse(response.text);
    expect(response.statusCode).toBe(400);
    expect(parsed.success).toBe(false);
  });
  it('should reject empty request', async () => {
    const response = await request(backend).post('/new');
    const parsed = JSON.parse(response.text);
    expect(response.statusCode).toBe(400);
    expect(parsed.success).toBe(false);
    expect(parsed.error).toBe('Empty request');
  });
});

describe('PUT /upvote', () => {
  it('should upvote a valid topic', async () => {
    const response = await request(backend).put('/upvote/0');
    const parsed = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(parsed.success).toBe(true);
  });
  it('should reject invalid topic id', async () => {
    const response = await request(backend).put('/upvote/1');
    const parsed = JSON.parse(response.text);
    expect(response.statusCode).toBe(400);
    expect(parsed.success).toBe(false);
  });
});

describe('non-existent methods', () => {
  it('should return HTTP 404 at unknown GET', async () => {
    const response = await request(backend).get('/asd');
    const parsed = JSON.parse(response.text);
    expect(response.statusCode).toBe(404);
    expect(parsed.success).toBe(false);
    expect(parsed.error).toBe('No method');
  });
  it('should return HTTP 404 at unknown PUT', async () => {
    const response = await request(backend).put('/asd');
    const parsed = JSON.parse(response.text);
    expect(response.statusCode).toBe(404);
    expect(parsed.success).toBe(false);
    expect(parsed.error).toBe('No method');
  });
  it('should return HTTP 404 at unknown POST', async () => {
    const response = await request(backend).post('/asd');
    const parsed = JSON.parse(response.text);
    expect(response.statusCode).toBe(404);
    expect(parsed.success).toBe(false);
    expect(parsed.error).toBe('No method');
  });
});
