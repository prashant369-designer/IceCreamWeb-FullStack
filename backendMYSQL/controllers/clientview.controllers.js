const db = require('../config/db');

exports.createReview = async (req, res) => {
    try {
        const review = await db.execute('INSERT INTO clientsview (heading, message,image, rating) VALUES (?, ?, ?, ?)', [req.body.heading, req.body.message, req.body.image, req.body.rating]);
        res.status(201).json("Review created successfully");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await db.execute('SELECT * FROM clientsview');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM clientsview WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching review by ID:', error);
        res.status(500).send('Error fetching review by ID');
    }
};

exports.deleteReview = async (req, res) => {
    try {
        await db.execute('DELETE FROM clientsview WHERE id = ?', [req.params.id]);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).send('Error deleting review');
    }
}