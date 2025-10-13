const db = require('../config/db');


exports.createblog = async (req, res) => {
  const { image, createdBy, title, description, badge } = req.body;
  if (!image || !createdBy || !title || !description || !badge) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const badgeStr = JSON.stringify(badge);
    const [result] = await db.execute(
      'INSERT INTO blogs (image, createdBy, title, description, badge) VALUES (?, ?, ?, ?, ?)',
      [image, createdBy, title, description, badgeStr]
    );

    res.status(201).json("Blog created successfully");
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).send('Error creating blog');
  }
};

exports.getblog = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM blogs');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send('Error fetching blogs');
  }
};

exports.getblogmodelbyid = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM blogs WHERE id = ?', [req.params.id]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    res.status(500).send('Error fetching blog by ID');
  }
};

exports.deleteblogmodel = async (req, res) => {
  try {
    await db.execute('DELETE FROM blogs WHERE id = ?', [req.params.id]);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).send('Error deleting blog');
  }
}

exports.updateblogmodel = async (req, res) => {
  try {
    const { image, createdBy, title, description, badge } = req.body;
    const badgeStr = JSON.stringify(badge);
    await db.execute(
      'UPDATE blogs SET image = ?, createdBy = ?, title = ?, description = ?, badge = ? WHERE id = ?',
      [image, createdBy, title, description, badgeStr, req.params.id]
    );
    res.json({ message: 'Blog updated successfully' });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).send('Error updating blog');
  }
}