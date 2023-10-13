const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Rutas para categorias
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);
router.patch('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
