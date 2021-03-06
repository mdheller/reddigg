# reddigg

[![Build Status](https://travis-ci.org/indocomsoft/reddigg.svg?branch=master)](https://travis-ci.org/indocomsoft/reddigg) [![Coverage Status](https://coveralls.io/repos/github/indocomsoft/reddigg/badge.svg?branch=master)](https://coveralls.io/github/indocomsoft/reddigg?branch=master) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/64255fcdbedb4299bbe5b6a592689873)](https://www.codacy.com/app/indocomsoft/reddigg?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=indocomsoft/reddigg&amp;utm_campaign=Badge_Grade)

A reddit/digg clone (hence the portmanteau name) for Carousell Coding Exercise.
A topic aggregator application -- users can submit topics and upvote/downvote topics.
The homepage shows the top 20 topics sorted by score.

Try it out at https://reddigg-pykbbjxyfr.now.sh

Proudly written using vim.

## Setup
Make sure you have Node.js and yarn/npm installed.

Clone the repository, then run these commands: (you can substitute `yarn` with `npm`)
```bash
yarn install
yarn build
yarn start
```

For deployment to [Zeit Now](https://zeit.co/now), simply run `yarn global add now` or `npm install -g now` to install the Now CLI, then run `now` on the repository.

## Back-end RESTful API
You can implement your own front-end too utilising the back-end API!

Backend API server responds in JSON -- to check whether your request succeeded you can either check for key success to be true, or the HTTP status code (200 for success, 400 for failure)
### Getting all topics
GET /all
### Creating new topic
POST /new

|key  |type  |
|-----|------|
|title|string|

### Upvoting a topic
PUT /upvote/:id
### Downvoting a topic
PUT /downvote/:id

## Technology Stack
### Front-end
- Next.js framework (a minimalistic framework for server-rendered React application)
- Bootstrap for styling and FontAwesome

This is my first time developing a web application using a JavaScript/React web framework, so I researched and considered either `create-react-app` or `Next.js`. I eventually went with `Next.js` because it is minimalistic, more opinionated (convention-over-configuration which makes rapid development easier for me), and comes with an easy integration with [Zeit Now](https://zeit.co/now) for deployment.
### Back-end
- Node.js

I wrote a simple model for Topic and TopicManager.

The data structure used is JavaScript Array. The reasoning is that JavaScript is an interpreted language, so internal implementation of Array differs for different JavaScript engines. However, Array is a commonly used data structure, and so it is usually highly optimised by the JavaScript engine. Moreover, many standard libraries to deal with Array also allows more rapid development, and allows my application to benefit from future improvements to the functions in the standard library.

In any case, my assumption is that the dataset is small, so using standard library is a good enough trade-off for performance vs development speed (to prevent over-engineering -- premature optimisation is the root of all evil).
### Testing
- Jest
- Enzyme
- Sinon
- jest-fetch-mock
### Miscellaneous
- ESLint for Linting, using Airbnb style guide
- TravisCI for Continuous Integration
- Coveralls for Code Coverage monitoring
- Codacy for automated code review
