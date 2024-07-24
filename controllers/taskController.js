const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
    const { store_id } = req.query;
    try {
        const tasks = await Task.findAll(store_id);
        res.status(200).json({ status: 1, message: 'Tasks fetched successfully', data: tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ status: 0, error: 'Error fetching tasks' });
    }
};

exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ status: 0, error: 'Task not found' });
        }
        res.status(200).json({ status: 1, message: 'Task fetched successfully', data: task });
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ status: 0, error: 'Error fetching task' });
    }
};

exports.createTask = async (req, res) => {
    const newTask = req.body;
    try {
        const createdTask = await Task.create(newTask);
        res.status(201).json({ status: 1, message: 'Task created successfully', data: createdTask });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ status: 0, error: 'Error creating task' });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const taskData = req.body;
    try {
        const updatedTask = await Task.update(id, taskData);
        res.status(200).json({ status: 1, message: 'Task updated successfully', data: updatedTask });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ status: 0, error: 'Error updating task' });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.delete(id);
        res.status(200).json({ status: 1, message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ status: 0, error: 'Error deleting task' });
    }
};
