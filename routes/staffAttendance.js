const express = require('express');
const router = express.Router();
const {
  getAllAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance
} = require('../controllers/staffAttendanceController');

// GET all attendance records
router.get('/', getAllAttendance);

// GET attendance record by ID
router.get('/:id', getAttendanceById);

// POST create a new attendance record
router.post('/', createAttendance);

// PUT update an attendance record
router.put('/:id', updateAttendance);

// DELETE delete an attendance record
router.delete('/:id', deleteAttendance);

module.exports = router;
