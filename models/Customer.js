const pool = require('../config/database');

class Customer {
  async findAll(storeId) {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM customers WHERE store_id = ?', [storeId]);
    connection.release();
    return rows;
  }

  async findById(id) {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM customers WHERE id = ?', [id]);
    connection.release();
    return rows[0];
  }

  async create(newCustomer) {
    const { store_id, name, email, phone, address, company_name, GST, area } = newCustomer;
    const connection = await pool.getConnection();
    const sql = 'INSERT INTO customers (store_id, name, email, phone, address, company_name, GST, area) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [store_id, name, email, phone, address, company_name, GST, area];
    const result = await connection.query(sql, values);
    connection.release();
    return { id: result.insertId, ...newCustomer };
  }

  async update(id, customerData) {
    const { name, email, phone, address, company_name, GST, area } = customerData;
    const connection = await pool.getConnection();
    const sql = 'UPDATE customers SET name = ?, email = ?, phone = ?, address = ?, company_name = ?, GST = ?, area = ? WHERE id = ?';
    const values = [name, email, phone, address, company_name, GST, area, id];
    await connection.query(sql, values);
    connection.release();
    return { id, ...customerData };
  }

  async delete(id) {
    const connection = await pool.getConnection();
    const sql = 'DELETE FROM customers WHERE id = ?';
    await connection.query(sql, [id]);
    connection.release();
    return { message: 'Customer deleted successfully' };
  }
}

module.exports = new Customer();
