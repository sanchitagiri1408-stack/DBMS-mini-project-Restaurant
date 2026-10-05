const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'restaurant_management',
    });

    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM dining_table');
    console.log('✅ Database connected! Tables found:', rows.length);
    console.log(rows);
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(error.message);
    process.exit(1);
  }
}

testConnection();
