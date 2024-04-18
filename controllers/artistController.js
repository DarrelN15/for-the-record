const Artist = require('../models/Artist');

exports.listAllArtists = (req, res) => {
  Artist.findAll((err, artists) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({ artists: artists });
    }
  });
};
