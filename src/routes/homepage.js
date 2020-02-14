const express = require('express');

const app = express();
const cors = require('cors');


app.use(cors());

const Post = require('../models/blog/Post');
const Podcast = require('../models/podcast/Podcast');
const Course = require('../models/course/Course');

app.get('/get/blog/most-read', async (req, res) => {
  Post.find()
  .sort('-howManyRead')
  .limit(5)
  .then((posts) => {
    res.status(301).send(posts)
  })
  .catch((err) => {
    console.log(err);
  })
});

module.exports = app;