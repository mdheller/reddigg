const express = require('express');
const bodyParser = require('body-parser');
const TopicManager = require('./models/TopicManager');

const app = express();

const tm = new TopicManager();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to the reddigg back-end!' });
});

app.get('/all', (req, res) => {
  res.status(200).json({ success: true, topics: tm.rank });
});

app.post('/new', (req, res) => {
  // Validate request
  if (req.body.title !== undefined) {
    try {
      tm.add(req.body.title);
    } catch (e) {
      res.status(400).json({ success: false, error: e });
      return;
    }
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, error: 'Empty request' });
  }
});

app.put('/upvote/:id', (req, res) => {
  try {
    tm.upvote(req.params.id);
  } catch (e) {
    res.status(400).json({ success: false, error: e });
    return;
  }
  res.status(200).json({ success: true });
});

app.all('*', (req, res) => {
  res.status(404).json({ success: false, error: 'No method' });
});

module.exports = app;
