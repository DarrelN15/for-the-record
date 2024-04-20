const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./my-music-store.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
    return;
  }
  console.log('Connected to the SQLite database.');

  // Create the 'albums' table if it does not exist
  db.run(`
    CREATE TABLE IF NOT EXISTS albums (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      genre TEXT,
      imageUrl TEXT
    );
  `, (err) => {
    if (err) {
      console.error('Error creating albums table', err.message);
    } else {
      console.log('Albums table is ready or already exists.');
      // Optional: Insert sample data here if necessary
    }
  });

  // Additional tables can be initialized here if needed
  // For example, creating an 'artists' table
  db.run(`
    CREATE TABLE IF NOT EXISTS artists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      bio TEXT
    );
  `, (err) => {
    if (err) {
      console.error('Error creating artists table', err.message);
    } else {
      console.log('Artists table is ready or already exists.');
      // Optional: Insert sample artist data here
    }
  });
});

module.exports = db;
