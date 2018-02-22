/* eslint-env jest */
import Topic from '../models/Topic';

describe('given valid topic', () => {
  const t = new Topic('asd');
  it('is created', () => {
    expect(t).toBeTruthy();
  });
  it('has a score of 0', () => {
    expect(t.score).toBe(0);
  });
  it('has the correct title', () => {
    expect(t.title).toBe('asd');
  });
});

describe('given invalid topic', () => {
  it('throws error', () => {
    expect(() => new Topic('a'.repeat(256))).toThrowError('Topic title too long (at most 255 characters)');
  });
});
