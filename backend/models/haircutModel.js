const db = require('./db');

async function registerHaircut(userId, imageUrl, description, dateTime) {
  const [result] = await db.query(
    'INSERT INTO haircuts (user_id, image_url, description, date_time) VALUES (?, ?, ?, ?)',
    [userId, imageUrl, description, dateTime]
  );
  return result.insertId;
}

async function getHaircutsByRUT(rut) {
  const [rows] = await db.query(
    `SELECT h.id, h.image_url, h.description, h.date_time
     FROM haircuts h
     JOIN users u ON h.user_id = u.id
     WHERE u.rut = ?
     ORDER BY h.date_time DESC`,
    [rut]
  );
  return rows;
}

module.exports = { registerHaircut, getHaircutsByRUT };
