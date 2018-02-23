const express = require('express');
const bodyParser = require('body-parser');
const TopicManager = require('./models/TopicManager');

const app = express();

const tm = new TopicManager();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to the reddigg back-end!' });
});

app.get('/all', (req, res) => {
  res.status(200).json({ success: true, topics: tm.rank });
});

app.post('/new', (req, res) => {
  // Validate request
  if (req.body.title !== undefined) {
    tryAction(res, () => { tm.add(req.body.title); });
  } else {
    throwError(res, 'Empty request');
  }
});

app.put('/upvote/:id', (req, res) => {
  tryAction(res, () => { tm.upvote(req.params.id); });
});

app.all('*', (req, res) => {
  res.status(404).json({ success: false, error: 'No method' });
});

module.exports = app;
