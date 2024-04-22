const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
  User.findByEmail(req.body.email, (err, user) => {
    if (err) {
      // Handles error
      res.status(500).send('Error during user retrieval');
    } else if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          // Passwords match
          // Sets user info in session
          req.session.userId = user.id;
          req.session.role = user.role;
          // Redirects based on role
          if (user.role === 'admin') {
            res.redirect('/admin/dashboard');
          } else {
            res.redirect('/user/profile');
          }
        } else {
          // Passwords don't match
          res.send('Incorrect password');
        }
      });
    } else {
      // No user found with that email
      res.send('No user found with that email');
    }
  });
});

module.exports = router;
