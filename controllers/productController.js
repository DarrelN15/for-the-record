const db = require('../db/database');

const productController = {
  listAllProducts: (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }
      // Send the rows back to the client
      res.json(rows);
    });
  },
  // Other CRUD operations can be implemented here.
};

module.exports = productController;
