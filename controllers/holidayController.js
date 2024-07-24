const Holiday = require('../models/Holiday');

// Controller functions
exports.getAllHolidays = async (req, res) => {
  const { store_id } = req.query; // Extract store_id from query params
  try {
    const holidays = await Holiday.findAll(store_id);
    res.status(200).json({ status: 1, message: 'Holidays fetched successfully', data: holidays });
  } catch (error) {
    console.error('Error fetching holidays:', error);
    res.status(500).json({ status: 0, error: 'Error fetching holidays' });
  }
};

exports.getHolidayById = async (req, res) => {
  const { id } = req.params;
  const { store_id } = req.query; // Extract store_id from query params
  try {
    const holiday = await Holiday.findById(id, store_id);
    if (!holiday) {
      return res.status(404).json({ status: 0, error: 'Holiday not found' });
    }
    res.status(200).json({ status: 1, message: 'Holiday fetched successfully', data: holiday });
  } catch (error) {
    console.error('Error fetching holiday:', error);
    res.status(500).json({ status: 0, error: 'Error fetching holiday' });
  }
};

exports.createHoliday = async (req, res) => {
  const newHoliday = req.body;
  try {
    const createdHoliday = await Holiday.create(newHoliday);
    res.status(201).json({ status: 1, message: 'Holiday created successfully', data: createdHoliday });
  } catch (error) {
    console.error('Error creating holiday:', error);
    res.status(500).json({ status: 0, error: 'Error creating holiday' });
  }
};

exports.updateHoliday = async (req, res) => {
  const { id } = req.params;
  const holidayData = req.body;
  const { store_id } = req.query; // Extract store_id from query params
  try {
    const updatedHoliday = await Holiday.update(id, holidayData, store_id);
    res.status(200).json({ status: 1, message: 'Holiday updated successfully', data: updatedHoliday });
  } catch (error) {
    console.error('Error updating holiday:', error);
    res.status(500).json({ status: 0, error: 'Error updating holiday' });
  }
};

exports.deleteHoliday = async (req, res) => {
  const { id } = req.params;
  const { store_id } = req.query; // Extract store_id from query params
  try {
    await Holiday.delete(id, store_id);
    res.status(200).json({ status: 1, message: 'Holiday deleted successfully' });
  } catch (error) {
    console.error('Error deleting holiday:', error);
    res.status(500).json({ status: 0, error: 'Error deleting holiday' });
  }
};
