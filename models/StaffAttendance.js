const pool = require('../config/database');

class StaffAttendance {
  async findAll() {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM staff_attendance');
    connection.release();
    return rows;
  }

  async findById(id) {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM staff_attendance WHERE id = ?', [id]);
    connection.release();
    return rows[0];
  }

  async create(newAttendance) {
    const { staff_id, store_id, attendance_date, timein, timeout, break_time, status } = newAttendance;
    const connection = await pool.getConnection();
    const sql = 'INSERT INTO staff_attendance (staff_id, store_id, attendance_date, timein, timeout, break_time, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [staff_id, store_id, attendance_date, timein, timeout, break_time, status];
    const result = await connection.query(sql, values);
    connection.release();
    return { id: result.insertId, ...newAttendance };
  }

  async update(id, attendanceData) {
    const { staff_id, store_id, attendance_date, timein, timeout, break_time, status } = attendanceData;
    const connection = await pool.getConnection();
    const sql = 'UPDATE staff_attendance SET staff_id = ?, store_id = ?, attendance_date = ?, timein = ?, timeout = ?, break_time = ?, status = ? WHERE id = ?';
    const values = [staff_id, store_id, attendance_date, timein, timeout, break_time, status, id];
    await connection.query(sql, values);
    connection.release();
    return { id, ...attendanceData };
  }

  async delete(id) {
    const connection = await pool.getConnection();
    const sql = 'DELETE FROM staff_attendance WHERE id = ?';
    await connection.query(sql, [id]);
    connection.release();
    return { message: 'Attendance record deleted successfully' };
  }
}

module.exports = new StaffAttendance();
