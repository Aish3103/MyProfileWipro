// middleware/validateStudent.js
// Validates POSTed student data — checks for name and email

module.exports = function validateStudent(req, res, next) {
  // Only validate when content-type indicates a body (POST/PUT/PATCH)
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    const { name, email } = req.body || {};
    if (!name || !email) {
      // stop execution and return a proper error response
      return res.status(400).format({
        html: () => res.render('error', { status: 400, message: 'Validation error: name and email are required.' }),
        json: () => res.json({ error: 'Validation error: name and email are required.' }),
        default: () => res.send('Validation error: name and email are required.')
      });
    }
  }
  // If valid or not a data-submitting method, continue
  next();
};
