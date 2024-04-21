const db = require('../database.js'); 

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


