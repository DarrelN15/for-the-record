const express = require('express');
const router = express.Router();
const db = require('../database.js'); 

// Route to display the cart
router.get('/', async (req, res) => {
  const cart = req.session.cart || [];
  res.render('cart', { cart });
});

// Route to add an album to the cart
router.post('/add-to-cart', async (req, res) => {
  const { albumId } = req.body;
  try {
    const album = await db.get('SELECT * FROM albums WHERE id = ?', [albumId]);
    
    if (!req.session.cart) {
      req.session.cart = [];
    }
    
    const existingAlbum = req.session.cart.find(item => item.id === albumId);
    if (existingAlbum) {
      existingAlbum.quantity += 1;
    } else {
      req.session.cart.push({...album, quantity: 1});
    }
    
    res.redirect('/cart');
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).send('Error adding item to cart.');
  }
});

module.exports = router;
