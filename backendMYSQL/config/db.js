const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',   // ✅ only hostname, no http://
  user: 'root',        // XAMPP default user
  password: '',        // put your root password if you set one
  database: 'lebagol',
  port: 3307,      
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
