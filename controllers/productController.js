const db = require('../database.js'); // SQLite connection

exports.listAllProducts = async (req, res) => {
    try {
        db.all("SELECT * FROM products", [], (err, products) => {
            if (err) {
                console.error('Failed to fetch products:', err);
                return res.status(500).render('error', { error: "Error loading products" });
            }
            res.render('product_list', { products });
        });
    } catch (error) {
        console.error('Database operation failed:', error);
        res.status(500).render('error', { error: "Error accessing the database" });
    }
};
