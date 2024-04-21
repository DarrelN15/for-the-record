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

  static create(newUser, callback) {
    // Creates a new user
    const { email, password, role } = newUser;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        callback(err);
      } else {
        db.run("INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
          [email, hashedPassword, role], function(err) {
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
