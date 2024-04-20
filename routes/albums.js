const express = require('express');
const router = express.Router();
const db = require('../database.js'); 

// Fetch all albums
router.get('/albums', (req, res) => {
  db.all("SELECT * FROM albums", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render('albums', { albums: rows });
    }
  });
});

module.exports = router;

