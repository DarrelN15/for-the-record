const express = require('express');
const router = express.Router();

// User list route.
router.get('/', (req, res) => {
  res.send('Users list will go here.');
});

module.exports = router;
