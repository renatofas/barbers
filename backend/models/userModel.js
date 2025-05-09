const db = require('./db');

async function findUserByEmail(email) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

async function createUser(name, email, passwordHash) {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, passwordHash]
  );
  return result.insertId;
}

module.exports = { findUserByEmail, createUser };
