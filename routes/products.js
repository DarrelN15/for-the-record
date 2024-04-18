const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.listAllProducts); // Implement this in your productController.js

module.exports = router;
