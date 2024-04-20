const express = require('express');
const router = express.Router();
const db = require('../database'); 

// Route to get a specific item by ID
router.get('/:id', (req, res) => {
  const albumId = req.params.id;
  db.get("SELECT * FROM albums WHERE id = ?", [albumId], (err, album) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching album from database");
    }
    if (!album) {
      return res.status(404).send("Album not found");
    }
    res.render('item', { album: album });
  });
});

module.exports = router;
