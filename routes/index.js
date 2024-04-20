const express = require('express');
const router = express.Router();
const db = require('../database'); // Ensure the path is correct

// Home page route.
router.get('/', async (req, res) => {
  try {
    // Fetching all albums
    db.all("SELECT * FROM albums", [], (err, albums) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error fetching albums from database");
      }

      // Fetching distinct genres
      db.all("SELECT DISTINCT genre FROM albums", [], (err, genres) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error fetching genres");
        }

        // Fetching distinct artists
        db.all("SELECT DISTINCT artist FROM albums", [], (err, artists) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Error fetching artists");
          }

          // Pseudo code for fetching distinct decades
          // You'll need to adapt this based on how you're storing dates in your database
          const decades = ['70s', '80s', '90s', '00s', '10s', 'Current']; // Placeholder for decades

          // Render the index page with albums, genres, artists, and decades
          res.render('index', {
            albums: albums,
            genres: genres.map(g => g.genre),
            artists: artists.map(a => a.artist),
            decades: decades // This is a placeholder
          });
        });
      });
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;

