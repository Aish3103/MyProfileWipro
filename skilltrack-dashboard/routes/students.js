// routes/students.js
const express = require('express');
const path = require('path');
const validateStudent = require('../middleware/validateStudent');

const router = express.Router();

// In-memory "database" for demo purposes
const students = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', progress: 72 },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', progress: 45 }
];

// Home — show students and form
router.get('/', (req, res) => {
  res.render('index', { students });
});

// Add student (uses validation middleware)
router.post('/students', validateStudent, (req, res, next) => {
  try {
    const { name, email } = req.body;
    const newStudent = {
      id: students.length + 1,
      name,
      email,
      progress: 0
    };
    students.push(newStudent);
    // Redirect back to list (POST-Redirect-GET)
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

// Route to intentionally throw an error (for testing error middleware)
router.get('/error-test', (req, res, next) => {
  next(new Error('This is a test error'));
});

module.exports = router;
