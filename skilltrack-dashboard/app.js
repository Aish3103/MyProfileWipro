// app.js — main application
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const requestLogger = require('./middleware/requestLogger');
const studentRouter = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// -------------------- MIDDLEWARE (Order is important) --------------------

// 1) Custom request-logging middleware (must log before routes)
app.use(requestLogger);

// 2) Built-in body parsers (JSON and urlencoded for form submissions)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3) Morgan — development-only logging
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  // 'dev' format includes status and response time
  app.use(morgan('dev'));
}

// 4) Mount routers
app.use('/', studentRouter);

// 5) 404 Not Found middleware
app.use((req, res, next) => {
  res.status(404);
  // respond with HTML
  if (req.accepts('html')) {
    return res.render('error', { status: 404, message: 'Page not found' });
  }
  // fallback to json
  if (req.accepts('json')) {
    return res.json({ error: 'Not found' });
  }
  res.type('txt').send('Not found');
});

// 6) Global error-handling middleware (four params)
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(err.status || 500);
  const message = err.message || 'Internal Server Error';
  if (req.accepts('html')) {
    return res.render('error', { status: res.statusCode, message });
  }
  if (req.accepts('json')) {
    return res.json({ error: message });
  }
  res.type('txt').send(message);
});

// Start server
app.listen(PORT, () => {
  console.log(`SkillTrack Dashboard listening on http://localhost:${PORT}`);
});
