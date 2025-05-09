const db = require('./db');

async function findUserByEmail(email) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

async function createUser(name, email, phone) {
  const [result] = await db.query(
    'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone]
  );
  return result.insertId;
}

module.exports = { findUserByEmail, createUser };
