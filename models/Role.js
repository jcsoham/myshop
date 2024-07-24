const pool = require('../config/database');

class Role {
  async findAll() {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM roles');
    connection.release();
    return rows;
  }

  async findById(id) {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM roles WHERE store_id = ?', [id]);
    connection.release();
    return rows;
  }

  async create(newRole) {
    const { name, store_id, created_on } = newRole;
    const connection = await pool.getConnection();
    const sql = 'INSERT INTO roles (name, store_id, created_on) VALUES (?, ?, ?)';
    const values = [name, store_id, created_on];
    const result = await connection.query(sql, values);
    connection.release();
    return { id: result.insertId, ...newRole };
  }

  async update(id, roleData) {
    const { name, store_id, created_on } = roleData;
    const connection = await pool.getConnection();
    const sql = 'UPDATE roles SET name = ?, store_id = ?, created_on = ? WHERE id = ?';
    const values = [name, store_id, created_on, id];
    await connection.query(sql, values);
    connection.release();
    return { id, ...roleData };
  }

  async delete(id) {
    const connection = await pool.getConnection();
    const sql = 'DELETE FROM roles WHERE id = ?';
    await connection.query(sql, [id]);
    connection.release();
    return { message: 'Role deleted successfully' };
  }
}

module.exports = new Role();
