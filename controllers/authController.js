const User = require('../models/user'); 
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register = (req, res) => {
    const { email, password, role } = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
            // handle error
            return res.status(500).send("Error encrypting password");
        }
        const newUser = { email, password: hash, role };
        User.create(newUser, function(error, user) {
            if (error) {
                // handle error
                return res.status(500).send("Error creating user");
            }
            // User created successfully, redirect or send success response
            res.redirect('/login');
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, function(err, user) {
        if (err) {
            // handle error
            return res.status(500).send("Error finding user");
        }
        if (user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if (result === true) {
                    // Set session and redirect based on role
                    req.session.user = user;
                    if (user.role === 'admin') {
                        res.redirect('/admin/dashboard');
                    } else {
                        res.redirect('/'); // User dashboard or home page
                    }
                } else {
                    // Password does not match
                    res.status(401).send("Incorrect password");
                }
            });
        } else {
            // User not found
            res.status(404).send("User not found");
        }
    });
};
