// models/Store.js

const pool = require('../config/database');

class Store {
  async findAll() {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM store');
    connection.release();
    return rows;
  }

  async findById(id) {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM store WHERE id = ?', [id]);
    connection.release();
    return rows[0];
  }

  async findByEmail(email) {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM store WHERE email = ?', [email]);
    connection.release();
    return rows[0];
  }


  async create(newStore) {
    const { name, email, password, start_date, end_date, created_on } = newStore;
    const connection = await pool.getConnection();
    const sql = 'INSERT INTO store (name, email, password, start_date, end_date, created_on) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name, email, password, start_date, end_date, created_on];
    const result = await connection.query(sql, values);
    connection.release();
    return { id: result.insertId, ...newStore };
  }

  async update(id, storeData) {
    const { name, email, password, start_date, end_date, created_on } = storeData;
    const connection = await pool.getConnection();
    const sql = 'UPDATE store SET name = ?, email = ?, password = ?, start_date = ?, end_date = ?, created_on = ? WHERE id = ?';
    const values = [name, email, password, start_date, end_date, created_on, id];
    await connection.query(sql, values);
    connection.release();
    return { id, ...storeData };
  }

  async delete(id) {
    const connection = await pool.getConnection();
    const sql = 'DELETE FROM store WHERE id = ?';
    await connection.query(sql, [id]);
    connection.release();
    return { message: 'Store deleted successfully' };
  }
}

module.exports = new Store();
