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
    let rankId;
    let swapId;
    // Loop to find the index of topic in this.rank and who to swap
    // Stop when end of array is reached or both swapId and rankId have been found
    for (let i = 0; i < this.rank.length || (swapId === undefined && rankId === undefined); i += 1) {
      if (this.rank[i] === topic) rankId = i;
      // The one to swap with is the earliest occurrence of topic with lower score
      if (swapId === undefined && this.rank[i].score < topic.score) swapId = i;
    }
    // If swapId is not found, swap with the last element of the array
    if (swapId === undefined) swapId = this.rank.length - 1;
    // Only swap if the order is wrong
    if ((swapId > rankId && this.rank[swapId].score > this.rank[rankId].score)
      || (swapId < rankId && this.rank[swapId].score < this.rank[rankId].score)) {
      const temp = this.rank[rankId];
      this.rank[rankId] = this.rank[swapId];
      this.rank[swapId] = temp;
    }
  }
}

module.exports = TopicManager;
