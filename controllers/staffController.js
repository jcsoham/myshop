const Staff = require('../models/Staff');

// GET all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const staffMembers = await Staff.findAll();
    res.status(200).json({ status: 1, message: 'Staff fetched successfully', data: staffMembers });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ status: 0, error: 'Error fetching staff' });
  }
};

// GET staff member by ID
exports.getStaffById = async (req, res) => {
  const { id } = req.params;
  try {
    const staffMember = await Staff.findById(id);
    if (!staffMember) {
      return res.status(404).json({ status: 0, error: 'Staff not found' });
    }
    res.status(200).json({ status: 1, message: 'Staff fetched successfully', data: staffMember });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ status: 0, error: 'Error fetching staff' });
  }
};

// CREATE a new staff member
exports.createStaff = async (req, res) => {
  const newStaff = req.body;
  try {
    const createdStaff = await Staff.create(newStaff);
    res.status(201).json({ status: 1, message: 'Staff created successfully', data: createdStaff });
  } catch (error) {
    console.error('Error creating staff:', error);
    res.status(500).json({ status: 0, error: 'Error creating staff' });
  }
};

// UPDATE staff member by ID
exports.updateStaff = async (req, res) => {
  const { id } = req.params;
  const staffData = req.body;
  try {
    const updatedStaff = await Staff.update(id, staffData);
    res.status(200).json({ status: 1, message: 'Staff updated successfully', data: updatedStaff });
  } catch (error) {
    console.error('Error updating staff:', error);
    res.status(500).json({ status: 0, error: 'Error updating staff' });
  }
};

// DELETE staff member by ID
exports.deleteStaff = async (req, res) => {
  const { id } = req.params;
  try {
    await Staff.delete(id);
    res.status(200).json({ status: 1, message: 'Staff deleted successfully' });
  } catch (error) {
    console.error('Error deleting staff:', error);
    res.status(500).json({ status: 0, error: 'Error deleting staff' });
  }
};
