const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('cart'); 
});

// Route to add an album to the cart
router.post('/add-to-cart', async (req, res) => {
    const { albumId } = req.body;
  
    try {
      // Simulates a database call
      const album = await Album.findById(albumId);
    
      if (!req.session.cart) {
        req.session.cart = [];
      }
      
      // Checks for duplicates
      const existingAlbum = req.session.cart.find(item => item.id === albumId);
      if (existingAlbum) {
        existingAlbum.quantity += 1; // Increment quantity
      } else {
        // Adds new item to cart
        req.session.cart.push({ ...album, quantity: 1 });
      }
    
      // Redirects or provides feedback here
      res.redirect('/cart');
    } catch (error) {
      // Handles errors, such as invalid albumId or database errors
      console.error('Error adding to cart:', error);
      res.status(500).send('Error adding item to cart.');
    }
  });  
  

module.exports = router;
