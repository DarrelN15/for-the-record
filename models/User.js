const db = require('../database.js');
const bcrypt = require('bcrypt');

class User {
  static findByEmail(email, callback) {
    // Finds a user by email
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  }

  static findById(id, callback) {
    // Finds a user by id
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  }

  static create(newUser, callback) {
    const { username, email, password, role } = newUser; 
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        callback(err);
      } else {
        db.run("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
          [username, email, hashedPassword, role], function(err) {
            if (err) {
              callback(err);
            } else {
              callback(null, { id: this.lastID, ...newUser, password: hashedPassword });
            }
        });
      }
    });
  }
}

module.exports = User;
