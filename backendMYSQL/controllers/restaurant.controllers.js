const db = require('../config/db');

exports.createlocation = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const [result] = await db.query(
            'INSERT INTO location (title, description, image) VALUES (?, ?, ?)',
            [title, description, image]
        );
        const [newLocation] = await db.query(
            'SELECT * FROM location WHERE id = ?',
            [result.insertId]
        );
        res.status(200).json(newLocation[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getlocation = async (req, res) => {
    try {
        const [locations] = await db.query('SELECT * FROM location');
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getlocationbyid = async (req, res) => {
    try {
        const [location] = await db.query('SELECT * FROM location WHERE id = ?', [req.params.id]);
        if (location.length === 0) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.status(200).json(location[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletelocation = async (req, res) => {
    try {
        const [location] = await db.query('SELECT * FROM location WHERE id = ?', [req.params.id]);
        if (location.length === 0) {
            return res.status(404).json({ message: 'Location not found' });
        }
        await db.query('DELETE FROM location WHERE id = ?', [req.params.id]);
        res.status(200).json(location[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatelocation = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const [result] = await db.query(
            'UPDATE location SET title = ?, description = ?, image = ? WHERE id = ?',
            [title, description, image, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Location not found' });
        }
        const [updatedLocation] = await db.query('SELECT * FROM location WHERE id = ?', [req.params.id]);
        res.status(200).json(updatedLocation[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};