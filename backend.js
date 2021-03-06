// Node Libraries
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import model and initiate
const TopicManager = require('./models/TopicManager');

const tm = new TopicManager();

// Helper functions
const throwError = (res, e) => {
  res.status(400).json({ success: false, error: e });
};
const tryAction = (res, action) => {
  try {
    action();
    res.status(200).json({ success: true });
  } catch (e) {
    throwError(res, e);
  }
};


// ROUTING
// Fetch all topics
app.get('/all', (req, res) => {
  res.status(200).json({ success: true, topics: tm.rank });
});

// Submit new topic
app.post('/new', (req, res) => {
  // Validate request
  if (req.body.title !== undefined) {
    tryAction(res, () => { tm.add(req.body.title); });
  } else {
    throwError(res, 'Empty request');
  }
});

// Upvote action
app.put('/upvote/:id', (req, res) => {
  tryAction(res, () => { tm.upvote(req.params.id); });
});

// Downvote action
app.put('/downvote/:id', (req, res) => {
  tryAction(res, () => { tm.downvote(req.params.id); });
});

module.exports = app;
