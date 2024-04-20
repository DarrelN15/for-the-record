const db = require('../database.js'); // Make sure this points to your SQLite database setup file

exports.getAlbums = async (req, res) => {
  db.all("SELECT * FROM albums LIMIT 5", [], (err, albums) => {
    if (err) {
      console.error('Error fetching albums:', err);
      res.status(500).render('error', { error: "Error loading albums" });
    } else {
      res.render('index', { albums });
    }
  });
};

// Implement other functions for genre, decade, and artist search using similar SQL queries
