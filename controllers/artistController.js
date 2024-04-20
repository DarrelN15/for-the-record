const db = require('../database.js');

exports.listAllArtists = (req, res) => {
  db.all("SELECT * FROM artists", [], (err, artists) => {
    if (err) {
      console.error('Error fetching artists:', err);
      res.status(500).json({ error: 'Error fetching artists' });
    } else {
      res.json({ artists: artists });
    }
  });
};
