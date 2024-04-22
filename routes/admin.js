const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { checkAdmin } = require('../middleware/authMiddleware');

function ensureAuthenticated(req, res, next) {
    if (!req.session.user) {
        req.flash('error', 'You need to be logged in to view this page.');
        return res.redirect('/auth/login');
    }
    next();
}

router.post('/login', (req, res) => {
  User.findByEmail(req.body.email, (err, user) => {
    if (err) {
      res.status(500).send('Error during user retrieval');
    } else if (user && user.role === 'admin') {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          req.session.userId = user.id;
          req.session.role = user.role;
          res.redirect('/admin/dashboard');
        } else {
          res.send('Incorrect password');
        }
      });
    } else {
      res.send('Unauthorized access or no admin found with that email');
    }
  });
});

// Admin dashboard route protected by checkAdmin middleware
router.get('/dashboard', ensureAuthenticated, checkAdmin, (req, res) => {
  // Admin dashboard logic 
  res.render('admin/dashboard');
});

module.exports = router;
