const express = require('express');
const router = express.Router();
const db = require('../database.js'); 

// Route to fetch a single album by its ID
router.get('/:id', (req, res) => {
    const albumId = req.params.id;
    db.get('SELECT * FROM albums WHERE id = ?', [albumId], (err, album) => {
        if (err) {
            console.error('Error fetching album:', err);
            return res.status(500).send('Internal server error');
        }
        if (album) {
            return res.render('albumPage', { album: album });
        } else {
            return res.status(404).send('Album not found');
        }
    });
});

module.exports = router;
