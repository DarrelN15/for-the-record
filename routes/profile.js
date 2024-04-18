const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Assuming you have a User model and are using some kind of ORM or database library
const User = require('../models/User');

router.get('/', (req, res) => {
  res.render('profile');
});

// Handle POST request for account creation
router.post('/create-account', async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user record in your database
    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role
    });

    // Redirect to login or profile page upon successful account creation
    res.redirect('/login'); // Change this to the appropriate route
  } catch (error) {
    // Handle errors, such as email already in use
    res.status(500).send("Account could not be created");
  }
});

module.exports = router;
