const mysql = require('mysql2/promise');
const dbConfig = require('../config/db');
// Create Herobanner
exports.createHerobanner = async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    await connection.beginTransaction();

    const { title, maintitle, description, button, images } = req.body;
    const [result] = await connection.execute(
      'INSERT INTO herobanner (title, maintitle, description, button) VALUES (?, ?, ?, ?)',
      [title, maintitle, description, button]
    );
    const herobannerId = result.insertId;

    if (images && images.length > 0) {
      const { image1, image2, image3, image4, image5, image6 } = images[0];
      await connection.execute(
        'INSERT INTO herobanner_images (herobanner_id, image1, image2, image3, image4, image5, image6) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [herobannerId, image1, image2, image3, image4, image5, image6]
      );
    }

    // Fetch the created banner with images
    const [rows] = await connection.execute(
      'SELECT h.*, hi.image1, hi.image2, hi.image3, hi.image4, hi.image5, hi.image6 ' +
      'FROM herobanner h LEFT JOIN herobanner_images hi ON h.id = hi.herobanner_id WHERE h.id = ?',
      [herobannerId]
    );
    const banner = rows[0];
    banner.images = [{
      image1: banner.image1,
      image2: banner.image2,
      image3: banner.image3,
      image4: banner.image4,
      image5: banner.image5,
      image6: banner.image6
    }];

    await connection.commit();
    res.status(201).json(banner);
  } catch (error) {
    if (connection) await connection.rollback();
    res.status(400).json({ message: error.message });
  } finally {
    if (connection) await connection.end();
  }
};

// Get all Herobanners
exports.getHerobanners = async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      'SELECT h.*, hi.image1, hi.image2, hi.image3, hi.image4, hi.image5, hi.image6 ' +
      'FROM herobanner h LEFT JOIN herobanner_images hi ON h.id = hi.herobanner_id'
    );

    // Format response to match MongoDB structure
    const herobanners = rows.map(row => ({
      ...row,
      images: [{
        image1: row.image1,
        image2: row.image2,
        image3: row.image3,
        image4: row.image4,
        image5: row.image5,
        image6: row.image6
      }]
    }));

    res.status(200).json(herobanners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    if (connection) await connection.end();
  }
};

// Get Herobanner by ID
exports.getHerobannerById = async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const { id } = req.params;
    const [rows] = await connection.execute(
      'SELECT h.*, hi.image1, hi.image2, hi.image3, hi.image4, hi.image5, hi.image6 ' +
      'FROM herobanner h LEFT JOIN herobanner_images hi ON h.id = hi.herobanner_id WHERE h.id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Herobanner not found." });
    }

    const herobannerData = rows[0];
    herobannerData.images = [{
      image1: herobannerData.image1,
      image2: herobannerData.image2,
      image3: herobannerData.image3,
      image4: herobannerData.image4,
      image5: herobannerData.image5,
      image6: herobannerData.image6
    }];

    res.status(200).json(herobannerData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    if (connection) await connection.end();
  }
};

// Update Herobanner
exports.updateHerobanner = async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    await connection.beginTransaction();

    const { id } = req.params;
    const { title, maintitle, description, button, images } = req.body;

    // Update herobanner table
    await connection.execute(
      'UPDATE herobanner SET title = ?, maintitle = ?, description = ?, button = ? WHERE id = ?',
      [title, maintitle, description, button, id]
    );

    // Delete existing images and insert new ones
    await connection.execute('DELETE FROM herobanner_images WHERE herobanner_id = ?', [id]);
    if (images && images.length > 0) {
      const { image1, image2, image3, image4, image5, image6 } = images[0];
      await connection.execute(
        'INSERT INTO herobanner_images (herobanner_id, image1, image2, image3, image4, image5, image6) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [id, image1, image2, image3, image4, image5, image6]
      );
    }

    // Fetch updated banner
    const [rows] = await connection.execute(
      'SELECT h.*, hi.image1, hi.image2, hi.image3, hi.image4, hi.image5, hi.image6 ' +
      'FROM herobanner h LEFT JOIN herobanner_images hi ON h.id = hi.herobanner_id WHERE h.id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Herobanner not found." });
    }

    const banner = rows[0];
    banner.images = [{
      image1: banner.image1,
      image2: banner.image2,
      image3: banner.image3,
      image4: banner.image4,
      image5: banner.image5,
      image6: banner.image6
    }];

    await connection.commit();
    res.status(200).json(banner);
  } catch (error) {
    if (connection) await connection.rollback();
    res.status(400).json({ message: error.message });
  } finally {
    if (connection) await connection.end();
  }
};

// Delete Herobanner
exports.deleteHerobanner = async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const { id } = req.params;

    // Check if herobanner exists
    const [rows] = await connection.execute('SELECT * FROM herobanner WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Herobanner not found." });
    }

    // Delete herobanner (images are automatically deleted due to ON DELETE CASCADE)
    await connection.execute('DELETE FROM herobanner WHERE id = ?', [id]);

    res.status(200).json({ message: "Herobanner deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  } finally {
    if (connection) await connection.end();
  }
};