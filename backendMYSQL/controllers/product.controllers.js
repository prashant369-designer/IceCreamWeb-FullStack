const db = require('../config/db');

exports.createpremiumice= async (req, res) => {
    try {
        const { title, description, content, image, price, rating, category, skutype, discount } = req.body;
        if (!title || !description || !content || !image || !price || !rating || !category || !skutype || discount == null) {
            return res.status(400).json({ message: "Missing required fields." });
        }
        if (discount > price) {
            return res.status(400).json({ message: "Discount cannot be greater than the price." });
        }
        const afterdiscount = price - discount;
        const discountPercentage = ((discount / price) * 100).toFixed(2);

        const newpremiumice = await db.execute(
            'INSERT INTO premium (title, description, content, image, price, rating, category, skutype, discount, afterdiscount, discountPercentage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [title, description, content, image, price, rating, category, skutype, discount, afterdiscount, discountPercentage]
        );

        res.status(201).json(newpremiumice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getpremiumice = async (req, res) => {
    try {
        const premiumice = await db.execute('SELECT * FROM premium');
        res.status(200).json(premiumice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deletepremiumice = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedpremiumice = await db.execute('DELETE FROM premium WHERE id = ?', [id]);
        if (!deletedpremiumice) {
            return res.status(404).json({ message: "premiumice not found." });
        }
        res.status(200).json({ message: "premiumice deleted successfully." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updatepremiumice = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedpremiumice = await db.execute('UPDATE premium SET ? WHERE id = ?', [req.body, id]);
        if (!updatedpremiumice) {
            return res.status(404).json({ message: "premiumice not found." });
        }
        res.status(200).json(updatedpremiumice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getpremiumiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const premiumice = await db.execute('SELECT * FROM premium WHERE id = ?', [id]);
        if (!premiumice) {
            return res.status(404).json({ message: "premiumice not found." });
        }
        res.status(200).json(premiumice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchpremiumice = async (req, res) => {
    try {
        const searchTerm = req.params.query;
        if (!searchTerm) {
            return res.status(400).json({ error: 'Search term is required' });
        }
        const results = await db.execute(
            'SELECT * FROM premium WHERE title LIKE ? OR description LIKE ?',
            [`%${searchTerm}%`, `%${searchTerm}%`]
        );
        res.json(results);
    } catch (err) {
        console.error('Error during search:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}