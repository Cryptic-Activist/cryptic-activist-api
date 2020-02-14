const mongoose = require('mongoose');

const CourseModule = require('./CourseModule').schema;

const LessonSchema = new mongoose.Schema({
  module: {
    type: [CourseModule],
    required: false,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
  updated_on: {
    type: Date,
    default: null,
  },
});

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;
