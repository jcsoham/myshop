const Store = require('../models/Store');

// Get all stores
exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.status(200).json({ status: 1, message: 'Stores fetched successfully', data: stores });
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({ status: 0, error: 'Error fetching stores' });
  }
};

// Get store by ID
exports.getStoreById = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await Store.findById(id);
    if (!store) {
      return res.status(404).json({ status: 0, error: 'Store not found' });
    }
    res.status(200).json({ status: 1, message: 'Store fetched successfully', data: store });
  } catch (error) {
    console.error('Error fetching store:', error);
    res.status(500).json({ status: 0, error: 'Error fetching store' });
  }
};

// Create a new store
exports.createStore = async (req, res) => {
  const newStore = req.body;
  try {
    const createdStore = await Store.create(newStore);
    res.status(201).json({ status: 1, message: 'Store created successfully', data: createdStore });
  } catch (error) {
    console.error('Error creating store:', error);
    res.status(500).json({ status: 0, error: 'Error creating store' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await Store.findByEmail(email);

    if (!user) {
      return res.status(404).json({ status: 0, message: 'User not found' });
    }

    // Validate password (comparing plain text for demonstration, not recommended in production)
    if (user.password !== password) {
      return res.status(401).json({ status: 0, message: 'Invalid credentials' });
    }

    // Password validation should ideally use bcrypt or similar for hashing and comparing hashed passwords

    res.json({ status: 1, message: 'Login successful', data: user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: 0, error: 'Server Error' });
  }
};


// Update store by ID
exports.updateStore = async (req, res) => {
  const { id } = req.params;
  const storeData = req.body;
  try {
    const updatedStore = await Store.update(id, storeData);
    res.status(200).json({ status: 1, message: 'Store updated successfully', data: updatedStore });
  } catch (error) {
    console.error('Error updating store:', error);
    res.status(500).json({ status: 0, error: 'Error updating store' });
  }
};

// Delete store by ID
exports.deleteStore = async (req, res) => {
  const { id } = req.params;
  try {
    await Store.delete(id);
    res.status(200).json({ status: 1, message: 'Store deleted successfully' });
  } catch (error) {
    console.error('Error deleting store:', error);
    res.status(500).json({ status: 0, error: 'Error deleting store' });
  }
};
