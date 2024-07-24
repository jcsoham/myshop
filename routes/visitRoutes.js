// routes/visitsRoutes.js
const express = require('express');
const router = express.Router();
const {
  createVisit,
  getAllVisits,
  getVisitById,
  updateVisit,
  deleteVisit
} = require('../controllers/visitsController');

// Routes for visits
router.post('/', createVisit);
router.get('/', getAllVisits);
router.get('/:id', getVisitById);
router.put('/:id', updateVisit);
router.delete('/:id', deleteVisit);

module.exports = router;
