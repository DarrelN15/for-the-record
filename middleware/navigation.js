const db = require('../database');

function setDropdowns(req, res, next) {
  const data = {};

  // Genres
  const fetchGenres = () =>
    new Promise((resolve, reject) => {
      db.all("SELECT DISTINCT genre FROM albums", [], (err, genres) => {
        if (err) {
          console.error(err);
          reject("Error fetching genres");
        } else {
          data.genres = genres.map(g => g.genre);
          resolve();
        }
      });
    });

    // Artists
  const fetchArtists = () =>
    new Promise((resolve, reject) => {
      db.all("SELECT DISTINCT artist FROM albums", [], (err, artists) => {
        if (err) {
          console.error(err);
          reject("Error fetching artists");
        } else {
          data.artists = artists.map(a => a.artist);
          resolve();
        }
      });
    });

  // Decades
  const fetchDecades = () =>
    new Promise((resolve, reject) => {
      data.decades = ['60s','70s', '80s', '90s', '00s', '10s', 'Current']; 
      resolve();
    });

  Promise.all([fetchGenres(), fetchArtists(), fetchDecades()])
    .then(() => {
      res.locals.dropdowns = data;
      next();
    })
    .catch(error => {
      console.error('Error setting dropdowns:', error);
      res.status(500).send('Failed to set navigation dropdowns');
    });
}

module.exports = setDropdowns;
