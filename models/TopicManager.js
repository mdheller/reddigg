const Topic = require('./Topic');

// TopicManager tracks topics using two arrays:
// topics and rank to store topics sorted by ID and score respectively.
// Each array element contains only a pointer to the Topic object, so there is
// only one single source of truth and no wasted memory space.
class TopicManager {
  constructor() {
    this.topics = [];         // Array of topics listed by ID
    this.rank = [];           // Linked list of topics sorted by score, descending
    this.insertion_point = 0; // Index where to insert the next new topic
  }
  // If the id is valid, return the topic
  get(id) {
    if (id < 0 || id > this.topics.length - 1) throw Error('Invalid ID');
    return this.topics[id];
  }
  // Insert the new topic into the insertion_point
  // Possible performance improvement: splice might be slower than creating a new
  // Array and discarding the old Array depending on JavaScript engine.
  add(title) {
    const topic = new Topic(title, this.topics.length);
    this.topics.push(topic);
    this.rank.splice(this.insertion_point, 0, topic);
    this.insertion_point += 1;
  }
  // Upvote a given topic id
  upvote(id) {
    if (this.get(id).score === -1) this.insertion_point += 1;
    this.adjust(id, 1);
  }
  // Downvote a given topic id
  downvote(id) {
    if (this.get(id).score === 0) this.insertion_point -= 1;
    this.adjust(id, -1);
  }
  // Re-sort this.rank in descending order using the built-in Array.prototype.sort function
  adjust(id, amount) {
    const topic = this.get(id);
    topic.score += amount;
    this.rank.sort((t1, t2) => t2.score - t1.score);
  }
}

module.exports = TopicManager;
