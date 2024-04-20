const express = require('express');
const router = express.Router();
const db = require('../database.js'); 

// Route to get albums by genre
router.get('/:genreName', (req, res) => {
  const selectedGenre = req.params.genreName;
  db.all("SELECT * FROM albums WHERE genre = ?", [selectedGenre], (err, albumsByGenre) => {
    if (err) {
      console.error(`Failed to fetch albums for genre ${selectedGenre}:`, err.message);
      return res.status(500).render('error', { error: "Error loading albums by genre" });
    }

    // Showing all genres in the dropdown 
    db.all("SELECT DISTINCT genre FROM albums", [], (err, genres) => {
      if (err) {
        console.error('Error fetching genres:', err.message);
        return res.status(500).render('error', { error: "Error loading genres" });
      }
      res.render('index', { albums: albumsByGenre, genres });
    });
  });
});

module.exports = router;
