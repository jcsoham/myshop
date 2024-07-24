const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');
const multer = require('multer');

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes for catalog items
router.get('/', catalogController.getAllItems);
router.get('/:id', catalogController.getItemById);
router.post('/', upload.single('image'), catalogController.createItem);
router.put('/:id', upload.single('image'), catalogController.updateItem);
router.delete('/:id', catalogController.deleteItem);

module.exports = router;
