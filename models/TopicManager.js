const Topic = require('./Topic');

class TopicManager {
  constructor() {
    // Array of topics listed by ID
    this.topics = [];
    // Linked list of topics sorted by score, descending
    this.rank = [];
    // Index where to insert the next new topic
    this.insertion_point = 0;
  }
  get(id) {
    if (id < 0 || id > this.topics.length - 1) throw Error('Invalid ID');
    return this.topics[id];
  }
  add(title) {
    const topic = new Topic(title, this.topics.length);
    this.topics.push(topic);
    this.rank.splice(this.insertion_point, 0, topic);
    this.insertion_point += 1;
  }
  upvote(id) {
    if (this.get(id).score === -1) this.insertion_point += 1;
    this.adjust(id, 1);
  }
  downvote(id) {
    if (this.get(id).score === 0) this.insertion_point -= 1;
    this.adjust(id, -1);
  }
  adjust(id, amount) {
    const topic = this.get(id);
    topic.score += amount;
    this.rank.sort((t1, t2) => t2.score - t1.score);
  }
}

module.exports = TopicManager;
