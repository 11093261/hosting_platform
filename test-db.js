require('dotenv').config();
const mysql = require('mysql2/promise');

async function test() {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('✅ Connected successfully!');
    await connection.end();
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  }
}
test();