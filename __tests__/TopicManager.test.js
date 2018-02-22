/* eslint-env jest */
import TopicManager from '../models/TopicManager';
import Topic from '../models/Topic';

describe('constructor', () => {
  const tm = new TopicManager();
  it('topics is an empty array', () => {
    expect(tm.topics).toBeDefined();
    expect(tm.topics).toHaveLength(0);
    expect(tm.topics).toBeInstanceOf(Array);
  });
  it('rank is an empty array', () => {
    expect(tm.rank).toBeDefined();
    expect(tm.rank).toHaveLength(0);
    expect(tm.rank).toBeInstanceOf(Array);
  });
  it('insertion_point is 0', () => {
    expect(tm.insertion_point).toBe(0);
  });
});

describe('add', () => {
  const tm = new TopicManager();
  it('adds one topic', () => {
    expect(tm.topics).toHaveLength(0);
    expect(tm.rank).toHaveLength(0);
    expect(tm.insertion_point).toBe(0);
    tm.add('qwerty');
    expect(tm.topics).toHaveLength(1);
    expect(tm.rank).toHaveLength(1);
    expect(tm.insertion_point).toBe(1);
    expect(tm.topics).toContainEqual(new Topic('qwerty', 0));
  });
  it('adds one more topic', () => {
    expect(tm.topics).toHaveLength(1);
    expect(tm.rank).toHaveLength(1);
    expect(tm.insertion_point).toBe(1);
    tm.add('asdfgh');
    expect(tm.topics).toHaveLength(2);
    expect(tm.rank).toHaveLength(2);
    expect(tm.insertion_point).toBe(2);
    expect(tm.topics).toContainEqual(new Topic('asdfgh', 1));
  });
});

describe('get', () => {
  const tm = new TopicManager();
  tm.add('qwerty');
  tm.add('asdfgh');
  it('gets the correct topic for a given id', () => {
    const topic = tm.get(1);
    expect(topic).toEqual(new Topic('asdfgh', 1));
  });
  it('rejects invalid id', () => {
    expect(() => tm.get(2)).toThrowError('Invalid ID');
  });
});


