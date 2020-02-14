const express = require('express');

const app = express();
const cors = require('cors');
const uuidv4 = require('uuid/v4');

app.use(cors());

const Course = require('../models/course/Course');
const CourseModule = require('../models/course/CourseModule');
const Lesson = require('../models/course/Lesson');

// Get all existing Courses
app.get('/', (req, res) => {
  const course_list = [];
  Course.find()
    .then((courses) => {
      courses.map((course) => {
        course_list.push({
          id: course.id,
          type: course.type,
          title: course.title,
          description: course.description,
          tags: course.tags,
          author: course.author,
          modules: course.modules,
          thumbnail: course.thumbnail,
          published_on: course.published_on,
          updated_on: course.updated_on,
        });
        console.log(course_list);
      });
      res.json(course_list);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log('Getting all courses...');
});

// Get specific Course by id
app.get('/course/id', (req, res) => {
  const { id } = req.body;
  const course_id = id;
  const course_list = [];
  Course.findOne({
    id: course_id,
  })
    .then((course) => {
      course_list.push(course);
      console.log('course_list in mongoose findone:', course_list);
      res.json({
        course_list,
      });
    })
    .catch((err) => {
      console.log('err:', err);
      res.json({
        errorMsg: err,
      });
    });
  console.log('course_list:', course_list);
});

// Get Course by Title
app.get('/course/:title', (req, res) => {});

// Get specific Course by Published Date (Date() format)
app.get('/course/:published_on', (req, res) => {});

// Get specific Course by Updated Date (Date() format)
app.get('/course/:updated_on', (req, res) => {});

// Publish Course
app.post('/course/publish', (req, res) => {
  const {
    title, description, tags, author, thumbnail_path,
  } = req.body;
  const errors = [];
  if (!title || !description || !tags || !author || !thumbnail_path) {
    errors.push({
      errorMsg: 'Please enter all fields',
    });
  }

  if (errors.length > 0) {
    console.log('Errors:', errors);
    res.json({
      errorsMsg: errors,
    });
  } else {
    const response = fetch('http://localhost:5000/courses/course/id');
    const id = uuidv4();
    const type = 'course';
    const published_on = Date.now();
    const updated_on = null;
    const modules = [];
    const newCourse = new Course({
      id,
      type,
      title,
      description,
      tags,
      author,
      modules,
      thumbnail_path,
      published_on,
      updated_on,
    });
    newCourse
      .save()
      .then((course) => {
        res.status(200).send({
          msg: 'Course successfully published',
          id,
          type,
          title,
          description,
          tags,
          author,
          modules,
          thumbnail_path,
          published_on,
          updated_on,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          errorMsg: err,
        });
      });
  }
});

// Get all course modules
app.get('/course-module/', (req, res) => {});

// Get Course Modules by Course
app.get('/course-module/:course', (req, res) => {});

// Get specific Course Module by id
app.get('/course-module/:id', (req, res) => {});

// Get Course Module by Title
app.get('/course-module/:title', (req, res) => {});

// Get specific Course Module by Published Date (Date() format)
app.get('/course-module/:published_on', (req, res) => {});

// Get specific Course Module by Updated Date (Date() format)
app.get('/course-module/:updated_on', (req, res) => {});

// Create New Module
app.post('/course-module/create', (req, res) => {
  const {
    course_id, lessons, title, description, author,
  } = req.body;
  const errors = [];
  if (!course_id || !lessons || !title || !description || !author) {
    errors.push({
      errorMsg: 'Please enter all fields',
      fields: {
        course_id,
        lessons,
        title,
        description,
        author,
      },
    });
  }

  if (!errors.length > 0) {
    console.log('Errors:', errors);
    res.json({
      errorsMsg: errors,
    });
  } else {
    const id = uuidv4();
    const created_on = Date.now();
    const updated_on = null;
    const newCourseModule = new CourseModule({
      id,
      course: course_list,
      lessons,
      title,
      description,
      author,
      created_on,
      updated_on,
    });

    newCourseModule
      .save()
      .then((course_module) => {
        res.status(200).send({
          msg: 'Course Module successfully',
          id,
          course,
          lessons,
          title,
          description,
          author,
          created_on,
          updated_on,
        });
      })
      .catch((err) => {
        res.status(500).send({
          errorMsg: err,
        });
      });
  }
});

// Get all lessons
app.get('/lessons/', (req, res) => {});

// Get Course Module by Course
app.get('/lessons/:course', (req, res) => {});

// Get specific Course by id
app.get('/lesson/:id', (req, res) => {});

// Get Course by Title
app.get('/lesson/:title', (req, res) => {});

// Get specific Course by Published Date (Date() format)
app.get('/lesson/:published_on', (req, res) => {});

// Get specific Course by Updated Date (Date() format)
app.get('/lesson/:updated_on', (req, res) => {});

// Create Lesson
app.post('/lesson/create', (req, res) => {});

module.exports = app;
