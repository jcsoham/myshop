// routes/store.js

const express = require('express');
const router = express.Router();
const {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
  login
} = require('../controllers/storeController');

// GET all stores
router.get('/', getAllStores);

// GET store by ID
router.get('/:id', getStoreById);

// POST create a new store
router.post('/', createStore);

// PUT update a store
router.put('/:id', updateStore);

// DELETE delete a store
router.delete('/:id', deleteStore);

router.post('/login', login);

module.exports = router;
