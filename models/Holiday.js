const pool = require('../config/database');

class Holiday {
  async findAll(store_id) {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM holidays WHERE store_id = ?', [store_id]);
    connection.release();
    return rows;
  }

  async findById(id, store_id) {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM holidays WHERE id = ? AND store_id = ?', [id, store_id]);
    connection.release();
    return rows[0];
  }

  async create(newHoliday) {
    const { name, date, store_id } = newHoliday;
    const connection = await pool.getConnection();
    const sql = 'INSERT INTO holidays (name, date, store_id) VALUES (?, ?, ?)';
    const values = [name, date, store_id];
    const result = await connection.query(sql, values);
    connection.release();
    return { id: result.insertId, ...newHoliday };
  }

  async update(id, holidayData, store_id) {
    const { name, date } = holidayData;
    const connection = await pool.getConnection();
    const sql = 'UPDATE holidays SET name = ?, date = ? WHERE id = ? AND store_id = ?';
    const values = [name, date, id, store_id];
    await connection.query(sql, values);
    connection.release();
    return { id, ...holidayData };
  }

  async delete(id, store_id) {
    const connection = await pool.getConnection();
    try {
      const sql = 'DELETE FROM holidays WHERE id = ? AND store_id = ?';
      const result = await connection.query(sql, [id, store_id]);
      connection.release();
      console.log(`Deleted holiday with id ${id} and store_id ${store_id}`);
      return { message: 'Holiday deleted successfully' };
    } catch (error) {
      console.error('Error deleting holiday:', error);
      throw error; // Propagate the error to handle it upstream
    }
  }
  
}

module.exports = new Holiday();
