const mysql = require('mysql2/promise');
const sendMail = require("../utils/mailer");


exports.createContact = async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    
    const { name, email, message } = req.body;
    const [result] = await connection.execute(
      'INSERT INTO contact (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    
    // Fetch the inserted contact
    const [rows] = await connection.execute(
      'SELECT * FROM contact WHERE id = ?',
      [result.insertId]
    );
    const contact = rows[0];

    // Stylish Email Template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:10px; padding:20px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color:#2c3e50; text-align:center;">📩 New Contact Form Submission</h2>
          <p style="font-size:15px; color:#555; text-align:center;">
            You have received a new contact request. Below are the details:
          </p>
          <hr style="border:none; border-top:1px solid #eee; margin:20px 0;">
          <table style="width:100%; font-size:15px; color:#333;">
            <tr>
              <td style="padding:8px; font-weight:bold; width:120px;">👤 Name:</td>
              <td style="padding:8px; background:#f4f6f8; border-radius:5px;">${contact.name}</td>
            </tr>
            <tr>
              <td style="padding:8px; font-weight:bold;">📧 Email:</td>
              <td style="padding:8px; background:#f4f6f8; border-radius:5px;">${contact.email}</td>
            </tr>
            <tr>
              <td style="padding:8px; font-weight:bold; vertical-align:top;">💬 Message:</td>
              <td style="padding:8px; background:#f4f6f8; border-radius:5px;">${contact.message}</td>
            </tr>
          </table>
          <hr style="border:none; border-top:1px solid #eee; margin:20px 0;">
          <p style="font-size:14px; color:#888; text-align:center;">
            This email was sent automatically from your website contact form.
          </p>
        </div>
      </div>
    `;

    // Send email
    await sendMail(
      process.env.EMAIL_USER,
      "📩 New Contact Form Submission",
      `New contact from ${contact.name} (${contact.email}) - ${contact.message}`,
      emailHtml
    );

    res.status(201).json({
      success: true,
      message: "Contact saved successfully and stylish email sent 🎉",
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  } finally {
    if (connection) await connection.end();
  }
};

exports.getContacts = async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [contacts] = await connection.execute('SELECT * FROM contact');
    
    res.status(200).json({ 
      success: true,
      data: contacts 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  } finally {
    if (connection) await connection.end();
  }
};

exports.deleteContacts = async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const { id } = req.params;
    
    // Fetch the contact before deletion
    const [rows] = await connection.execute('SELECT * FROM contact WHERE id = ?', [id]);
    const contact = rows[0];
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "Contact not found"
      });
    }

    await connection.execute('DELETE FROM contact WHERE id = ?', [id]);
    
    res.status(200).json({ 
      success: true,
      message: "Contact deleted successfully",
      data: contact
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  } finally {
    if (connection) await connection.end();
  }
};