const db = require('../database.js'); 

class Album {
  static findAll(callback) {
    // Gets all albums
    db.all("SELECT * FROM albums", [], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  static findByGenre(genre, callback) {
    // Gets albums by genre
    db.all("SELECT * FROM albums WHERE genre = ?", [genre], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  static findById(id, callback) {
    // Gets an album by ID
    db.get("SELECT * FROM albums WHERE id = ?", [id], (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  }

  static create(newAlbum, callback) {
    // Inserts a new album
    const { title, artist, price, description, genre, imageUrl } = newAlbum;
    db.run("INSERT INTO albums (title, artist, price, description, genre, imageUrl) VALUES (?, ?, ?, ?, ?, ?)",
      [title, artist, price, description, genre, imageUrl], function(err) {
        if (err) {
          callback(err);
        } else {
          callback(null, { id: this.lastID, ...newAlbum });
        }
    });
  }
}

module.exports = Album;
