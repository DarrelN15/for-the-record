const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database.js'); 
const User = require('../models/User'); 

function ensureAuthenticated(req, res, next) {
    if (!req.session.user) {
        req.flash('error', 'You need to be logged in to view this page.');
        return res.redirect('/auth/login');
    }
    next();
}

router.get('/', ensureAuthenticated, (req, res) => {
    const userId = req.session.user.id;
    User.findById(userId, (err, user) => { 
        if (err) {
            req.flash('error', 'Error retrieving user information.');
            return res.redirect('/'); // Redirects to a safe page
        }
        res.render('profile', { user });
    });
});

// Handles POST request for account updates if needed
router.post('/update-account', ensureAuthenticated, async (req, res) => {
    const { email, username } = req.body;
    const userId = req.session.user.id;

});

module.exports = router;
