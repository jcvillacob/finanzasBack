const express = require('express');
const budgetController = require('../controllers/budgetController');

const router = express.Router();

// Rutas para presupuesto (budget)
router.get('/:id', budgetController.getBudget);
router.post('/:id', budgetController.createOrUpdateBudget);
router.delete('/', budgetController.deleteBudget);

module.exports = router;
