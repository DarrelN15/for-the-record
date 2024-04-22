const sqlite3 = require('sqlite3').verbose();

// Connects to SQLite database
const db = new sqlite3.Database('./my-music-store.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
    return;
  }
  console.log('Connected to the SQLite database.');

  // Creates the 'albums' table if it does not exist
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
    }
  });

  // Creates the 'users' table if it does not exist
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin', 'artist', 'user')) DEFAULT 'user',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `, (err) => {
    if (err) {
      console.error('Error creating users table', err.message);
    } else {
      console.log('Users table is ready or already exists.');
    }
  });

  // Creates the 'artists' table if it does not exist
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
    }
  });
  
  // Creates the 'purchases' table if it does not exist
  db.run(`
  CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    albumId INTEGER,
    quantity INTEGER,
    purchaseDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (albumId) REFERENCES albums(id)
);
  `, (err) => {
    if (err) {
      console.error('Error creating purchases table', err.message);
    } else {
      console.log('Purchases table is ready or already exists.');
    }
  });

});

module.exports = db;
