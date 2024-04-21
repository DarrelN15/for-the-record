const express = require('express');
const router = express.Router();
const db = require('../database');

// Route to get albums by artist
router.get('/:artistName', async (req, res) => {
    const selectedArtist = req.params.artistName;
    try {
        const sql = "SELECT * FROM albums WHERE artist = ?";
        db.all(sql, [selectedArtist], (err, albums) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error fetching albums for artist");
            }
            res.render('artist', { 
                albums: albums, 
                artist: selectedArtist 
            });
        });
    } catch (error) {
        console.error('Error fetching albums for artist:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
