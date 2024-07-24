const express = require('express');
const router = express.Router();
const {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff
} = require('../controllers/staffController');

// GET all staff members
router.get('/', getAllStaff);

// GET staff member by ID
router.get('/:id', getStaffById);

// POST create a new staff member
router.post('/', createStaff);

// PUT update a staff member
router.put('/:id', updateStaff);

// DELETE delete a staff member
router.delete('/:id', deleteStaff);

module.exports = router;
