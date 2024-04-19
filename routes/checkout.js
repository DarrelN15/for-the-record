const express = require('express');
const router = express.Router();

// Route to display the checkout page
router.get('/', (req, res) => {
  let cart = req.session.cart || []; // If cart doesn't exist, default to an empty array

  // Calculate the total cost of the cart
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0);

  console.log("Displaying checkout page:", cart, total);
  res.render('checkout', { cart: cart, total: total });
});

// Route to process the checkout form
router.post('/', (req, res) => {
  const { firstName, lastName, email, address, paymentInfo } = req.body;

  console.log("Processing checkout for:", firstName, lastName, email);
  // Here you would integrate with a payment gateway
  // The following code is commented out because it's a placeholder for your payment processing logic.
  /*
  PaymentGateway.processPayment(paymentInfo, (error, response) => {
    if (error) {
      console.error('Payment processing error:', error);
      return res.status(500).render('checkout', { cart: req.session.cart, total: req.session.total, error: 'Payment failed, please try again.' });
    }

    // Assuming the payment was successful and order was created
    // You would have to replace 'createOrder' with your actual function to create an order
    createOrder({ firstName, lastName, email, address, cart: req.session.cart }, (orderError, orderResult) => {
      if (orderError) {
        console.error('Order creation failed:', orderError);
        return res.status(500).render('checkout', { cart: req.session.cart, total: req.session.total, error: 'Could not create order, please try again.' });
      }

      req.session.cart = []; // Clear the cart after successful order placement
      res.redirect('/order-confirmation'); // Redirect to an order confirmation page
    });
  });
  */

  // For demonstration purposes, redirect to an order confirmation page
  // In a real scenario, you would handle payment and order creation before redirecting
  res.redirect('/order-confirmation');
});

module.exports = router;
