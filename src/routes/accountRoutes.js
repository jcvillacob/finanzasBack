const express = require('express');
const accountController = require('../controllers/accountController');

const router = express.Router();

// Rutas para categorias
router.post('/', accountController.createAccount);
router.get('/', accountController.getAccounts);
router.get('/:id', accountController.getAccount);
router.patch('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;
