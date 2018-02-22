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


describe('upvote', () => {
  const tm = new TopicManager();
  tm.add('1');
  tm.add('2');
  tm.add('3');
  tm.add('4');
  it('topic upvoted rose to the top', () => {
    tm.upvote(2);
    expect(tm.rank[0]).toEqual(tm.get(2));
  });
  it('another topic upvoted more rose to the top', () => {
    tm.upvote(1);
    tm.upvote(1);
    expect(tm.rank[0]).toEqual(tm.get(1));
  });
  it('new topic added is put after insertion point', () => {
    tm.add('5');
    expect(tm.rank[tm.insertion_point - 1]).toEqual(tm.get(4));
  });
});

describe('downvote', () => {
  const tm = new TopicManager();
  tm.add('1');
  tm.add('2');
  tm.add('3');
  tm.add('4');
  it('topic downvoted sank to the bottom', () => {
    tm.downvote(2);
    expect(tm.rank[tm.topics.length - 1]).toEqual(tm.get(2));
  });
  it('another topic downvoted more sank to the bottom', () => {
    tm.downvote(1);
    tm.downvote(1);
    expect(tm.rank[tm.topics.length - 1]).toEqual(tm.get(1));
  });
  it('new topic added is put after insertion point', () => {
    tm.add('5');
    expect(tm.rank[tm.insertion_point - 1]).toEqual(tm.get(4));
  });
});

describe('combined up/downvote', () => {
  const tm = new TopicManager();
  tm.add('1');
  tm.add('2');
  tm.add('3');
  tm.add('4');
  it('topic upvoted rose to the top', () => {
    tm.upvote(1);
    expect(tm.rank[0]).toEqual(tm.get(1));
  });
  it('same topic downvoted twice sank to the bottom', () => {
    tm.downvote(1);
    tm.downvote(1);
    expect(tm.rank[tm.topics.length - 1]).toEqual(tm.get(1));
  });
  it('same topic upvoted twice rose to the top', () => {
    tm.upvote(1);
    tm.upvote(1);
    expect(tm.rank[0]).toEqual(tm.get(1));
  });
  it('another topic upvoted twice rose to the top', () => {
    tm.upvote(2);
    tm.upvote(2);
    expect(tm.rank[0]).toEqual(tm.get(2));
  });
  it('another topic downvoted sank to the bottom', () => {
    tm.downvote(0);
    expect(tm.rank[tm.topics.length - 1]).toEqual(tm.get(0));
  });
  it('another topic downvoted twice sank to the bottom', () => {
    tm.downvote(3);
    tm.downvote(3);
    expect(tm.rank[tm.topics.length - 1]).toEqual(tm.get(3));
  });
});
