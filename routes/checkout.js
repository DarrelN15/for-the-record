const express = require('express');
const router = express.Router();

// Route to display the checkout page
router.get('/', (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  res.render('checkout', { cart, total });
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

module.exports = router;
