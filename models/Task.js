const pool = require('../config/database');

class Task {
    async findAll(store_id) {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM tasks WHERE store_id = ?', [store_id]);
        connection.release();
        return rows;
    }

    async findById(id) {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM tasks WHERE id = ?', [id]);
        connection.release();
        return rows[0];
    }

    async create(newTask) {
        const { store_id, title, description, assigned_to } = newTask;
        const connection = await pool.getConnection();
        const sql = 'INSERT INTO tasks (store_id, title, description, assigned_to) VALUES (?, ?, ?, ?)';
        const values = [store_id, title, description, assigned_to];
        const result = await connection.query(sql, values);
        connection.release();
        return { id: result.insertId, ...newTask };
    }

    async update(id, taskData) {
        const { title, description, assigned_to, status } = taskData;
        const connection = await pool.getConnection();
        const sql = 'UPDATE tasks SET title = ?, description = ?, assigned_to = ?, status = ? WHERE id = ?';
        const values = [title, description, assigned_to, status, id];
        await connection.query(sql, values);
        connection.release();
        return { id, ...taskData };
    }

    async delete(id) {
        const connection = await pool.getConnection();
        const sql = 'DELETE FROM tasks WHERE id = ?';
        await connection.query(sql, [id]);
        connection.release();
        return { message: 'Task deleted successfully' };
    }
}

module.exports = new Task();
