const Customer = require('../models/Customer');

exports.getAllCustomers = async (req, res) => {
  const { store_id } = req.query; // Extract store_id from query params
  try {
    const customers = await Customer.findAll(store_id);
    res.status(200).json({ status: 1, message: 'Customers fetched successfully', data: customers });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ status: 0, error: 'Error fetching customers' });
  }
};

exports.getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ status: 0, error: 'Customer not found' });
    }
    res.status(200).json({ status: 1, message: 'Customer fetched successfully', data: customer });
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ status: 0, error: 'Error fetching customer' });
  }
};

exports.createCustomer = async (req, res) => {
  const newCustomer = req.body;
  try {
    const createdCustomer = await Customer.create(newCustomer);
    res.status(201).json({ status: 1, message: 'Customer created successfully', data: createdCustomer });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ status: 0, error: 'Error creating customer' });
  }
};

exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const customerData = req.body;
  try {
    const updatedCustomer = await Customer.update(id, customerData);
    res.status(200).json({ status: 1, message: 'Customer updated successfully', data: updatedCustomer });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ status: 0, error: 'Error updating customer' });
  }
};

exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await Customer.delete(id);
    res.status(200).json({ status: 1, message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ status: 0, error: 'Error deleting customer' });
  }
};
