const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./my-music-store.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to the SQLite database.');
    db.run('CREATE TABLE IF NOT EXISTS artists (...)', (err) => {
      if (err) {
        // Table already created
      } else {
        // Table just created, creating some rows
      }
    });
  }
});

module.exports = db;
