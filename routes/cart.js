const express = require('express');
const router = express.Router();
const db = require('../database.js'); 

// Route to display the cart
router.get('/', async (req, res) => {
  const cart = req.session.cart || [];
  res.render('cart', { cart });
});

// Route to add an album to the cart
router.post('/add-to-cart', ensureAuthenticated, (req, res) => {
    const { albumId } = req.body;
    if (!req.session.user) {
        return res.status(403).json({ success: false, message: 'You must be logged in to add items to the cart.' });
    }
    const userId = req.session.user.id; 

    db.get('SELECT * FROM albums WHERE id = ?', [albumId], (err, album) => {
      if (err) {
        console.error('Error fetching album:', err);
        return res.status(500).json({ success: false, message: 'Error adding item to cart.' });
      }
      if (!album) {
        return res.status(404).json({ success: false, message: 'Album not found.' });
      }
      if (!req.session.cart) {
        req.session.cart = [];
      }
      
      // Check if the album is already in the cart
      let existingAlbumIndex = req.session.cart.findIndex(item => item.id === albumId);
      
      if (existingAlbumIndex > -1) {
        // Increment quantity if already in cart
        req.session.cart[existingAlbumIndex].quantity += 1;
      } else {
        // Add new item to the cart
        req.session.cart.push({
          id: album.id,
          title: album.title,
          artist: album.artist,
          price: album.price,
          imageUrl: album.imageUrl,
          quantity: 1
        });
      }
      
      // Respond with JSON indicating success
      res.json({ success: true, message: 'Added to cart!' });
    });
});

function ensureAuthenticated(req, res, next) {
    if (!req.session.user) {
        return res.status(403).json({ success: false, message: 'Not authenticated. Please log in.' });
    }
    next();
}

  
// Route to handle the POST request for item removal
router.post('/remove-item', (req, res) => {
    const { albumId } = req.body;
    
    // Assuming req.session.cart is an array of album objects
    req.session.cart = req.session.cart.filter(item => item.id != albumId);
    
    // After modifying the cart, save the session and respond
    req.session.save(err => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to update the cart.' });
      }
      res.json({ success: true, message: 'Item removed from cart.' });
    });
});

module.exports = router;
