// middleware/requestLogger.js
// Custom logging middleware — logs timestamp, method, and URL before route handlers

module.exports = function requestLogger(req, res, next) {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  // Important: allow request to continue
  next();
};
