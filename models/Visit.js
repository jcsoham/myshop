// models/Visit.js
const pool = require('../config/database');

class Visit {
  async createVisit(visitData) {
    const { customer_id, staff_id, store_id, visit_date, purpose, details } = visitData;
    try {
      const connection = await pool.getConnection();
      const sql = 'INSERT INTO visits (customer_id, staff_id, store_id, visit_date, purpose, details) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [customer_id, staff_id, store_id, visit_date, purpose, details];
      const result = await connection.query(sql, values);
      connection.release();
      return { id: result.insertId, ...visitData };
    } catch (error) {
      console.error('Error creating visit:', error);
      throw error;
    }
  }

  async getAllVisits() {
    try {
      const connection = await pool.getConnection();
      const [rows, fields] = await connection.query('SELECT * FROM visits');
      connection.release();
      return rows;
    } catch (error) {
      console.error('Error fetching visits:', error);
      throw error;
    }
  }

  async getVisitById(id) {
    try {
      const connection = await pool.getConnection();
      const [rows, fields] = await connection.query('SELECT * FROM visits WHERE id = ?', [id]);
      connection.release();
      return rows[0];
    } catch (error) {
      console.error('Error fetching visit:', error);
      throw error;
    }
  }

  async updateVisit(id, visitData) {
    const { customer_id, staff_id, store_id, visit_date, purpose, details } = visitData;
    try {
      const connection = await pool.getConnection();
      const sql = 'UPDATE visits SET customer_id = ?, staff_id = ?, store_id = ?, visit_date = ?, purpose = ?, details = ? WHERE id = ?';
      const values = [customer_id, staff_id, store_id, visit_date, purpose, details, id];
      await connection.query(sql, values);
      connection.release();
      return { id, ...visitData };
    } catch (error) {
      console.error('Error updating visit:', error);
      throw error;
    }
  }

  async deleteVisit(id, store_id) {
    try {
      const connection = await pool.getConnection();
      const sql = 'DELETE FROM visits WHERE id = ? AND store_id = ?';
      await connection.query(sql, [id, store_id]);
      connection.release();
      return { message: 'Visit deleted successfully' };
    } catch (error) {
      console.error('Error deleting visit:', error);
      throw error;
    }
  }

  // Other methods as needed
}

module.exports = new Visit();
