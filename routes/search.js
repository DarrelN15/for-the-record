const express = require('express');
const router = express.Router();
const db = require('../database.js'); 

// Artist search route
router.post('/search/artist', (req, res) => {
  db.all("SELECT * FROM albums WHERE artist LIKE ?", [`%${req.body.artist}%`], (err, albums) => {
    if (err) {
      console.error('Error fetching artist search results:', err.message);
      return res.status(500).render('error', { error: err.message });
    }
    res.render('search-results', { albums });
  });
});

// General search route
router.post('/search', (req, res) => {
  const searchTerm = `%${req.body.searchTerm}%`;
  db.all("SELECT * FROM albums WHERE artist LIKE ? OR title LIKE ?", [searchTerm, searchTerm], (err, albums) => {
    if (err) {
      console.error('Error fetching search results:', err.message);
      return res.status(500).render('error', { error: err.message });
    }
    res.render('search-results', { albums });
  });
});

module.exports = router;
