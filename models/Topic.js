class Topic {
  constructor(title) {
    if (title.length > 255) throw Error('Topic title too long (at most 255 characters)');
    this.title = title;
    this.score = 0;
  }
}

module.exports = Topic;
