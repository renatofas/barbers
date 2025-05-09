const db = require('./db');

async function findUserByRUT(rut) {
  const [rows] = await db.query('SELECT * FROM users WHERE rut = ?', [rut]);
  return rows[0];
}

async function createUser(name, email, rut, passwordHash) {
  const [result] = await db.query(
    'INSERT INTO users (name, email, rut, password_hash) VALUES (?, ?, ?, ?)',
    [name, email, rut, passwordHash]
  );
  return result.insertId;
}

module.exports = { findUserByRUT, createUser };
