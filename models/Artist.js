const db = require('../database.js');

const Artist = {
  findAll: (callback) => {
    db.all('SELECT * FROM artists', callback);
  },

  findById: (id, callback) => {
    db.get('SELECT * FROM artists WHERE id = ?', [id], callback);
  },

};

module.exports = Artist;
