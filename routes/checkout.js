const express = require('express');
const router = express.Router();

// Middleware to ensure the user is authenticated
function ensureAuthenticated(req, res, next) {
    if (!req.session.user) {
        req.flash('error', 'You need to be logged in to view the checkout page.');
        return res.redirect('/auth/login');
    }
    next();
}

// Route to display the checkout page
router.get('/', ensureAuthenticated, (req, res) => {
    if (!req.session.cart || req.session.cart.length === 0) {
      req.flash('error', 'Your cart is empty!');
      return res.redirect('/');
    }
  
    console.log("Cart items before calculating total:", req.session.cart);
  
    const cart = req.session.cart;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
    console.log("Calculated total:", total);
  
    res.render('checkout', {
      cart: cart,
      total,
      user: req.session.user
    });
  });
  

// Route to process the checkout form
router.post('/', (req, res) => {
  const { firstName, lastName, email, address, paymentInfo } = req.body;

  // Example processing logic
  console.log("Processing checkout for:", firstName, lastName, email);
  
  // Clear the cart after successful processing
  req.session.cart = [];
  
  res.redirect('/order-confirmation'); // Redirects to a confirmation page
});

// Route to handle the purchase
router.post('/purchase', ensureAuthenticated, (req, res) => {
    req.session.cart = [];  // Clears the shopping cart
  
    // Flashes a success message
    req.flash('success', 'Successful purchase!');
    res.redirect('/');  // Redirects back to the homepage
  });
  


module.exports = router;
