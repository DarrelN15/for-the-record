const express = require('express');
const router = express.Router();
const db = require('../database'); 

// Home page route.
router.get('/', async (req, res) => {
    try {
        // Fetch all albums
        db.all("SELECT * FROM albums", [], (err, albums) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error fetching albums from database");
            }

            // Fetch distinct genres
            db.all("SELECT DISTINCT genre FROM albums", [], (err, genres) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error fetching genres");
                }

                // Fetch distinct artists
                db.all("SELECT DISTINCT artist FROM albums", [], (err, artists) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Error fetching artists");
                    }

                    const decades = ['70s', '80s', '90s', '00s', '10s', 'Current']; // Placeholder for decades

                    // Renders the index page with albums, genres, artists, and decades
                    res.render('index', {
                        user: req.session.user, // Pass user session to the view
                        albums: albums,
                        genres: genres.map(g => g.genre),
                        artists: artists.map(a => a.artist),
                        decades: decades
                    });
                });
            });
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;

