const db = require('../config/db');

exports.createCategory = async (req, res) => {
    try {
        const { title,description,mainimage,btn,backgroundimage,backgroundColor } = req.body;
        const [result] = await db.execute('INSERT INTO category (title,description,mainimage,btn,backgroundimage,backgroundColor) VALUES (?,?,?,?,?,?)', [title,description,mainimage,btn,backgroundimage,backgroundColor]);
        res.status(201).json({ message: 'Category created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).send('Error creating category');
    }
};

exports.getCategories = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM category');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).send('Error fetching categories');
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM category WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        res.status(500).send('Error fetching category by ID');
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await db.execute('DELETE FROM category WHERE id = ?', [req.params.id]);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).send('Error deleting category');
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { title, description, mainimage, btn, backgroundimage, backgroundColor } = req.body;
        await db.execute(
            'UPDATE category SET title = ?, description = ?, mainimage = ?, btn = ?, backgroundimage = ?, backgroundColor = ? WHERE id = ?',
            [title, description, mainimage, btn, backgroundimage, backgroundColor, req.params.id]
        );
        res.json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).send('Error updating category');
    }
};