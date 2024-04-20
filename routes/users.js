const express = require('express');
const router = express.Router();
const db = require('../database.js'); 

// User list route
router.get('/', (req, res) => {
  db.all("SELECT * FROM users", [], (err, users) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).send('Error fetching users');
    }
    res.send({ users });
  });
});

module.exports = router;
