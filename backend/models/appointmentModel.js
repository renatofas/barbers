const db = require('./db');

async function createAppointment(userId, dateTime, cutOption) {
  const [result] = await db.query(
    'INSERT INTO appointments (user_id, date_time, cut_option) VALUES (?, ?, ?)',
    [userId, dateTime, cutOption]
  );
  return result.insertId;
}

async function getAppointments() {
  const [rows] = await db.query(
    'SELECT a.id, u.name, u.email, a.date_time, a.cut_option FROM appointments a JOIN users u ON a.user_id = u.id ORDER BY a.date_time'
  );
  return rows;
}

module.exports = { createAppointment, getAppointments };
