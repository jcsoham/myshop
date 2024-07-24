// routes/users.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
  pool.query('SELECT * FROM users', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

module.exports = router;
