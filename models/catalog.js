const pool = require('../config/database');

class Catalog {
  async findAll() {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM catalog');
    connection.release();
    return rows;
  }

  async findById(id) {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM catalog WHERE id = ?', [id]);
    connection.release();
    return rows[0];
  }

  async create(newItem) {
    const { store_id, product_name, image_url, price, stock, detail_description } = newItem;
    const connection = await pool.getConnection();
    const sql = 'INSERT INTO catalog (store_id, product_name, image_url, price, stock, detail_description) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [store_id, product_name, image_url, price, stock, detail_description];
    const result = await connection.query(sql, values);
    connection.release();
    return { id: result.insertId, ...newItem };
  }

  async update(id, newData) {
    const { store_id, product_name, image_url, price, stock, detail_description } = newData;
    const connection = await pool.getConnection();
    const sql = 'UPDATE catalog SET store_id = ?, product_name = ?, image_url = ?, price = ?, stock = ?, detail_description = ? WHERE id = ?';
    const values = [store_id, product_name, image_url, price, stock, detail_description, id];
    await connection.query(sql, values);
    connection.release();
    return { id, ...newData };
  }

  async delete(id) {
    const connection = await pool.getConnection();
    const sql = 'DELETE FROM catalog WHERE id = ?';
    await connection.query(sql, [id]);
    connection.release();
    return { message: 'Item deleted successfully' };
  }
}

module.exports = new Catalog();
