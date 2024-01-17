const express = require('express');
const userController = require('../controllers/userController');
const auth = require('./../middleware/auth');

const router = express.Router();

// Rutas para usuarios
router.get('/', /* auth.verifyUser, */ userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;