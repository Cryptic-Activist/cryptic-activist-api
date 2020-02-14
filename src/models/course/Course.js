const mongoose = require('mongoose');

const CourseModule = require('./CourseModule').schema;

const CourseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: false,
  },
  // author: {
  // 	type: mongoose.Schema.Types.ObjectId,
  // 	ref: "User",
  // 	required: true
  // },
  author: {
    type: String,
    required: true,
  },
  modules: {
    type: [CourseModule],
    require: false,
    default: [],
  },
  thumbnail_path: {
    type: String,
    required: true,
  },
  published_on: {
    type: Date,
    default: Date.now,
  },
  updated_on: {
    type: Date,
    default: null,
  },
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
