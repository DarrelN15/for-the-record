const express = require('express');
const router = express.Router();
const db = require('../database.js'); 

// Function to list all products
function listAllProducts(req, res) {
  db.all("SELECT * FROM albums", [], (err, products) => {
    if (err) {
      console.error('Error fetching products:', err.message);
      return res.status(500).render('error', { error: "Error loading products" });
    }
    res.render('products', { products });
  });
}

router.get('/', listAllProducts);

module.exports = router;
