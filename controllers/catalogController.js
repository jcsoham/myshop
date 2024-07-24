const Catalog = require('../models/catalog');
const path = require('path');
const fs = require('fs');

// Function to handle file upload
const uploadImage = async (file) => {
  const fileExtension = path.extname(file.originalname);
  const newFileName = `${Date.now()}${fileExtension}`;
  const uploadPath = path.join(__dirname, '../public/images/', newFileName);

  return new Promise((resolve, reject) => {
    fs.writeFile(uploadPath, file.buffer, (err) => {
      if (err) reject(err);
      resolve(`/images/${newFileName}`);
    });
  });
};

// Controller functions
exports.getAllItems = async (req, res) => {
  try {
    const items = await Catalog.findAll();
    res.status(200).json({ status: 1, message: 'Items fetched successfully', data: items });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ status: 0, error: 'Error fetching items' });
  }
};

exports.getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Catalog.findById(id);
    if (!item) {
      return res.status(404).json({ status: 0, error: 'Item not found' });
    }
    res.status(200).json({ status: 1, message: 'Item fetched successfully', data: item });
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ status: 0, error: 'Error fetching item' });
  }
};

exports.createItem = async (req, res) => {
  const { store_id, product_name, price, stock, detail_description } = req.body;
  const image = req.file;

  try {
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const newItem = {
      store_id,
      product_name,
      image_url: imageUrl,
      price,
      stock,
      detail_description,
    };

    const createdItem = await Catalog.create(newItem);
    res.status(201).json({ status: 1, message: 'Item created successfully', data: createdItem });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ status: 0, error: 'Error creating item' });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { store_id, product_name, price, stock, detail_description } = req.body;
  const image = req.file;

  try {
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const updatedData = {
      store_id,
      product_name,
      image_url: imageUrl,
      price,
      stock,
      detail_description,
    };

    const updatedItem = await Catalog.update(id, updatedData);
    res.status(200).json({ status: 1, message: 'Item updated successfully', data: updatedItem });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ status: 0, error: 'Error updating item' });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Catalog.delete(id);
    res.status(200).json({ status: 1, message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ status: 0, error: 'Error deleting item' });
  }
};
