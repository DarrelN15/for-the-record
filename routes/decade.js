const express = require('express');
const router = express.Router();
const db = require('../database');

// Route to get albums by decade
router.get('/:decadeName', async (req, res) => {
    const selectedDecade = req.params.decadeName;
    try {
        const sql = "SELECT * FROM albums WHERE decade = ?";
        db.all(sql, [selectedDecade], (err, albums) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error fetching albums for decade");
            }
            res.render('decade', { 
                albums: albums, 
                decade: selectedDecade 
            });
        });
    } catch (error) {
        console.error('Error fetching albums for decade:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
