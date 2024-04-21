const db = require('../db/database');

const Product = {
  findAll: (callback) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  },

  findById: (id, callback) => {
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, row);
    });
  },

  create: (productData, callback) => {
    const { name, price, /* other attributes */ } = productData;
    db.run('INSERT INTO products (name, price /* other attributes */) VALUES (?, ?, /*...*/)', [name, price /*...*/], function(err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, this.lastID);
    });
  },

};

module.exports = Product;
