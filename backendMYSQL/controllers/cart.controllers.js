const db = require('../config/db');

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { premiumId, quantity } = req.body;

    // Check if premium ice exists
    const [productRows] = await db.execute('SELECT * FROM premium WHERE id = ?', [premiumId]);
    if (productRows.length === 0) return res.status(404).json({ message: "Product not found" });

    // Check if item already in cart
    const [cartRows] = await db.execute('SELECT * FROM cart WHERE premium_id = ?', [premiumId]);

    if (cartRows.length > 0) {
      // Update quantity
      const newQuantity = cartRows[0].quantity + (quantity || 1);
      await db.execute('UPDATE cart SET quantity = ? WHERE id = ?', [newQuantity, cartRows[0].id]);
      const [updatedCart] = await db.execute('SELECT * FROM cart WHERE id = ?', [cartRows[0].id]);
      return res.status(200).json(updatedCart[0]);
    } else {
      // Insert new cart item
      const [result] = await db.execute(
        'INSERT INTO cart (premium_id, user_id, quantity) VALUES (?, ?, ?)',
        [premiumId, 1, quantity || 1]
      );
      const [newCart] = await db.execute('SELECT * FROM cart WHERE id = ?', [result.insertId]);
      return res.status(201).json(newCart[0]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cart items with premium ice details
exports.getCart = async (req, res) => {
  try {
    const [cart] = await db.execute(`
      SELECT c.id AS cart_id, c.user_id, c.quantity, p.id AS premium_id, p.title, p.price, p.image, p.afterdiscount
      FROM cart c
      JOIN premium p ON c.premium_id = p.id
    `);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute('DELETE FROM cart WHERE id = ?', [id]);

    if (result.affectedRows === 0) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
