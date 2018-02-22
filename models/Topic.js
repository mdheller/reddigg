class Topic {
  constructor(title, id) {
    if (title.length > 255) throw Error('Topic title too long (at most 255 characters)');
    this.title = title;
    this.score = 0;
    this.id = id;
  }
}

module.exports = Topic;
