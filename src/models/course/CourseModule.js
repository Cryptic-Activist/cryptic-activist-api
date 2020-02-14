const mongoose = require('mongoose');

const Lesson = require('./Lesson').schema;
const Course = require('./Course').schema;

const CourseModuleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  course: {
    type: [Course],
    required: false,
    default: [],
  },
  lessons: {
    type: [Lesson],
    required: false,
    default: [],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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
  created_on: {
    type: Date,
    default: Date.now,
  },
  updated_on: {
    type: Date,
    default: null,
  },
});

const CourseModule = mongoose.model('CourseModule', CourseModuleSchema);

module.exports = CourseModule;
