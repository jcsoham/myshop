// controllers/visitsController.js
const Visit = require('../models/Visit');

exports.createVisit = async (req, res) => {
  const { customer_id, staff_id, store_id, visit_date, purpose, details } = req.body;

  try {
    const createdVisit = await Visit.createVisit({ customer_id, staff_id, store_id, visit_date, purpose, details });
    res.status(201).json({ status: 1, message: 'Visit created successfully', data: createdVisit });
  } catch (error) {
    console.error('Error creating visit:', error);
    res.status(500).json({ status: 0, error: 'Error creating visit' });
  }
};

exports.getAllVisits = async (req, res) => {
  try {
    const visits = await Visit.getAllVisits();
    res.status(200).json({ status: 1, message: 'Visits fetched successfully', data: visits });
  } catch (error) {
    console.error('Error fetching visits:', error);
    res.status(500).json({ status: 0, error: 'Error fetching visits' });
  }
};

exports.getVisitById = async (req, res) => {
  const { id } = req.params;
  try {
    const visit = await Visit.getVisitById(id);
    if (!visit) {
      return res.status(404).json({ status: 0, error: 'Visit not found' });
    }
    res.status(200).json({ status: 1, message: 'Visit fetched successfully', data: visit });
  } catch (error) {
    console.error('Error fetching visit:', error);
    res.status(500).json({ status: 0, error: 'Error fetching visit' });
  }
};

exports.updateVisit = async (req, res) => {
  const { id } = req.params;
  const { customer_id, staff_id, store_id, visit_date, purpose, details } = req.body;

  try {
    const updatedVisit = await Visit.updateVisit(id, { customer_id, staff_id, store_id, visit_date, purpose, details });
    res.status(200).json({ status: 1, message: 'Visit updated successfully', data: updatedVisit });
  } catch (error) {
    console.error('Error updating visit:', error);
    res.status(500).json({ status: 0, error: 'Error updating visit' });
  }
};

exports.deleteVisit = async (req, res) => {
  const { id } = req.params;
  const { store_id } = req.query; // Assuming store_id is passed as query param
  try {
    await Visit.deleteVisit(id, store_id);
    res.status(200).json({ status: 1, message: 'Visit deleted successfully' });
  } catch (error) {
    console.error('Error deleting visit:', error);
    res.status(500).json({ status: 0, error: 'Error deleting visit' });
  }
};

// Other methods as needed
