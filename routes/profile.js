const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database.js'); 

router.get('/', (req, res) => {
  res.render('profile');
});

// Handles POST request for account creation
router.post('/create-account', async (req, res) => {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      // Create a new user record in your SQLite database
      db.run(`INSERT INTO users (email, password, role) VALUES (?, ?, ?)`,
        [req.body.email, hashedPassword, req.body.role], 
        function(err) {
          if (err) {
            req.flash('error', 'Account could not be created');
            res.redirect('/profile'); // Stay on the same page to show the error
          } else {
            req.flash('success', 'Account created successfully.');
            res.redirect('/login'); // Adjust according to your routing
          }
      });
    } catch (error) {
      // Handle errors, such as email already in use
      req.flash('error', 'Account could not be created');
      res.redirect('/profile');
    }
  });
  

module.exports = router;
