const StaffAttendance = require('../models/StaffAttendance');

// GET all attendance records
exports.getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await StaffAttendance.findAll();
    res.status(200).json({ status: 1, message: 'Attendance records fetched successfully', data: attendanceRecords });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ status: 0, error: 'Error fetching attendance records' });
  }
};

// GET attendance record by ID
exports.getAttendanceById = async (req, res) => {
  const { id } = req.params;
  try {
    const attendanceRecord = await StaffAttendance.findById(id);
    if (!attendanceRecord) {
      return res.status(404).json({ status: 0, error: 'Attendance record not found' });
    }
    res.status(200).json({ status: 1, message: 'Attendance record fetched successfully', data: attendanceRecord });
  } catch (error) {
    console.error('Error fetching attendance record:', error);
    res.status(500).json({ status: 0, error: 'Error fetching attendance record' });
  }
};

// CREATE a new attendance record
exports.createAttendance = async (req, res) => {
  const newAttendance = req.body;
  try {
    const createdAttendance = await StaffAttendance.create(newAttendance);
    res.status(201).json({ status: 1, message: 'Attendance record created successfully', data: createdAttendance });
  } catch (error) {
    console.error('Error creating attendance record:', error);
    res.status(500).json({ status: 0, error: 'Error creating attendance record' });
  }
};

// UPDATE attendance record by ID
exports.updateAttendance = async (req, res) => {
  const { id } = req.params;
  const attendanceData = req.body;
  try {
    const updatedAttendance = await StaffAttendance.update(id, attendanceData);
    res.status(200).json({ status: 1, message: 'Attendance record updated successfully', data: updatedAttendance });
  } catch (error) {
    console.error('Error updating attendance record:', error);
    res.status(500).json({ status: 0, error: 'Error updating attendance record' });
  }
};

// DELETE attendance record by ID
exports.deleteAttendance = async (req, res) => {
  const { id } = req.params;
  try {
    await StaffAttendance.delete(id);
    res.status(200).json({ status: 1, message: 'Attendance record deleted successfully' });
  } catch (error) {
    console.error('Error deleting attendance record:', error);
    res.status(500).json({ status: 0, error: 'Error deleting attendance record' });
  }
};
