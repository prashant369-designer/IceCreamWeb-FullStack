const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/mailer.js');

const db= require('../config/db');

// Register user
const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Check if user exists
        const [userExists] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (userExists.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user
        const [result] = await db.query(
            'INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)',
            [fullName, email, hashedPassword]
        );

        // Fetch created user
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [result.insertId]);

        const subject = 'Registration Successful - Welcome to Lebagol';
        const text = `Hi ${fullName}, You are successfully registered.`;
        const html = `
            <div style="
                font-family: Arial, sans-serif; 
                background-color: #f9f9f9; 
                padding: 20px; 
                border-radius: 10px; 
                border: 1px solid #e0e0e0; 
                max-width: 600px; 
                margin: auto;
            ">
                <h2 style="
                    color: #333333; 
                    text-align: center;
                ">Welcome, ${fullName}!</h2>
                <p style="
                    font-size: 16px; 
                    color: #555555;
                ">
                    You have successfully registered with our platform.
                </p>
                <p style="
                    font-size: 16px; 
                    color: #555555;
                ">
                    We're excited to have you onboard 🚀
                </p>
                <div style="
                    text-align: center; 
                    margin-top: 30px;
                ">
                    <a href="https://painfx-936j.vercel.app/login" style="
                        display: inline-block; 
                        background-color: #4CAF50; 
                        color: #ffffff; 
                        text-decoration: none; 
                        padding: 12px 25px; 
                        border-radius: 5px; 
                        font-weight: bold;
                    ">Go to Dashboard</a>
                </div>
                <p style="
                    font-size: 12px; 
                    color: #999999; 
                    text-align: center; 
                    margin-top: 20px;
                ">
                    If you did not register, please ignore this email.
                </p>
            </div>
        `;

        try {
            await sendMail(email, subject, text, html);
        } catch (mailErr) {
            console.error('Email sending failed:', mailErr);
        }

        res.status(201).json({
            _id: user[0].id,
            fullName: user[0].fullName,
            email: user[0].email,
            token: generateToken(user[0].id),
            message: 'User registered successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let source = 'user';
        let user = null;

        // Check users table
        const [userRows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (userRows.length > 0) {
            user = userRows[0];
        } else {
            // Check admins table
            const [adminRows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
            if (adminRows.length > 0) {
                user = adminRows[0];
                source = 'admin';
            }
        }

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const role = source === 'admin' ? user.role || 'admin' : 'user';

        res.json({
            _id: user.id,
            fullName: user.fullName || user.adminName,
            email: user.email,
            role: role,
            token: generateToken(user.id, role)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update password
const updatePassword = async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;

        let source = 'user';
        let account = null;

        // Check users table
        const [userRows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (userRows.length > 0) {
            account = userRows[0];
        } else {
            // Check admins table
            const [adminRows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
            if (adminRows.length > 0) {
                account = adminRows[0];
                source = 'admin';
            }
        }

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, account.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid current password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        if (source === 'user') {
            await db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
        } else {
            await db.query('UPDATE admins SET password = ? WHERE email = ?', [hashedPassword, email]);
        }

        res.json({
            message: 'Password updated successfully',
            role: source,
            email: account.email
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Forget password
const foregtPassword = async (req, res) => {
    const { email } = req.body;

    try {
        let source = 'user';
        let user = null;

        // Check users table
        const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (userRows.length > 0) {
            user = userRows[0];
        } else {
            // Check admins table
            const [adminRows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
            if (adminRows.length > 0) {
                user = adminRows[0];
                source = 'admin';
            }
        }

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const fullName = user.fullName || user.adminName;
        const password = user.password; // Note: This is the hashed password, not plain-text

        const subject = 'Forget Password';
        const text = `Hi ${fullName}, Your Older Password is ${password}.`;
        const html = `
            <div style="
                font-family: Arial, sans-serif; 
                background-color: #f9f9f9; 
                padding: 20px; 
                border-radius: 10px; 
                border: 1px solid #e0e0e0; 
                max-width: 600px; 
                margin: auto;
            ">
                <h2 style="
                    color: #333333; 
                    text-align: center;
                ">Welcome, ${fullName}!</h2>
                <h2 style="
                    color: #333333; 
                    text-align: center;
                ">Older Password: ${password}</h2>
                <p style="
                    font-size: 16px; 
                    color: #555555;
                ">
                    Successfully sent your password
                </p>
                <p style="
                    font-size: 16px; 
                    color: #555555;
                ">
                    We're excited to have you onboard 
                </p>
                <div style="
                    text-align: center; 
                    margin-top: 30px;
                ">
                    <a href="https://painfx-936j.vercel.app/login" style="
                        display: inline-block; 
                        background-color: #4CAF50; 
                        color: #ffffff; 
                        text-decoration: none; 
                        padding: 12px 25px; 
                        border-radius: 5px; 
                        font-weight: bold;
                    ">Go to Dashboard</a>
                </div>
                <p style="
                    font-size: 12px; 
                    color: #999999; 
                    text-align: center; 
                    margin-top: 20px;
                ">
                    If the password is not correct please contact Admin 8445545226
                </p>
            </div>
        `;

        try {
            await sendMail(email, subject, text, html);
        } catch (mailErr) {
            console.error('Email sending failed:', mailErr);
        }

        res.status(201).json({
            message: 'Password sent successfully on the mail',
            role: source,
            email: user.email,
            password: user.password // Note: This is hashed, not plain-text
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Generate JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '10m'
    });
};

module.exports = {
    registerUser,
    loginUser,
    updatePassword,
    foregtPassword
};