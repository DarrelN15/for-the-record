const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database'); 
const User = require('../models/User'); 

// Route for login page
router.get('/login', (req, res) => {
    // The messages are retrieved from the flash middleware and passed to the EJS template
    res.render('login', { 
        messages: {
            error: req.flash('error'), 
            success: req.flash('success')
        } 
    });
});

// Route for handling login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    User.findByEmail(email, (err, user) => {
        if (err) {
            req.flash('error', 'An error occurred on the server. Please try again later.');
            res.redirect('/auth/login');
        } else if (!user) {
            req.flash('error', 'No user found with that email address.');
            res.redirect('/auth/login');
        } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    req.flash('error', 'An error occurred during login. Please try again.');
                    res.redirect('/auth/login');
                } else if (isMatch) {
                    // Authentication successful, set user session
                    req.session.user = { id: user.id, role: user.role, username: user.username };
                    // Redirect based on user role
                    if (user.role === 'admin') {
                        res.redirect('/admin/dashboard'); // Admin dashboard
                    } else {
                        res.redirect('/'); // User homepage
                    }
                } else {
                    req.flash('error', 'Password does not match.');
                    res.redirect('/auth/login');
                }
            });
        }
    });
});


// Route for registration page
router.get('/register', (req, res) => {
    let messages = req.flash('error');
    res.render('register', { messages: messages });
});

// Route for handling registration
router.post('/register', (req, res) => {
    console.log('Register endpoint hit'); // Log when the endpoint is hit
    const { username, email, password, role } = req.body;
    
    console.log('Register Form Data:', req.body); // Log the form data received

    User.create({ username, email, password, role }, (err, newUser) => {
        if (err) {
            console.error('Error during user creation:', err); // Log any errors during user creation
            req.flash('error', err.message); // Show error message if username exists
            res.redirect('/auth/register');
        } else {
            console.log('New user created:', newUser); // Log the new user data
            req.flash('success', 'Account created successfully! Please login.');
            res.redirect('/auth/login'); // Redirect to the login page after successful registration
        }
    });
});


// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/'); // Redirects to the home page after logout
    });
});

module.exports = router;
