const pool = require('../config/database');

class Staff {
  async findAll() {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM staff');
    connection.release();
    return rows;
  }

  async findById(id) {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM staff WHERE id = ?', [id]);
    connection.release();
    return rows[0];
  }

  async create(newStaff) {
    const { name, store_id, role_id, email, password } = newStaff;
    const connection = await pool.getConnection();
    const sql = 'INSERT INTO staff (name, store_id, role_id, email, password) VALUES (?, ?, ?, ?, ?)';
    const values = [name, store_id, role_id, email, password];
    const result = await connection.query(sql, values);
    connection.release();
    return { id: result.insertId, ...newStaff };
  }

  async update(id, staffData) {
    const { name, store_id, role_id, email, password } = staffData;
    const connection = await pool.getConnection();
    const sql = 'UPDATE staff SET name = ?, store_id = ?, role_id = ?, email = ?, password = ? WHERE id = ?';
    const values = [name, store_id, role_id, email, password, id];
    await connection.query(sql, values);
    connection.release();
    return { id, ...staffData };
  }

  async delete(id) {
    const connection = await pool.getConnection();
    const sql = 'DELETE FROM staff WHERE id = ?';
    await connection.query(sql, [id]);
    connection.release();
    return { message: 'Staff deleted successfully' };
  }
}

module.exports = new Staff();
