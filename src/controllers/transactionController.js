const Transaction = require('../models/Transaction');

// Obtener todas las transacciones con cuenta y categoría mapeadas
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('accountId').populate('categoryId');
        res.status(200).json({
            status: 'success',
            data: {
                transactions
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

// Obtener una transacción por ID con cuenta y categoría mapeadas
exports.getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate('accountId').populate('categoryId');
        res.status(200).json({
            status: 'success',
            data: {
                transaction
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};


// Crear una nueva transacción
exports.createTransaction = async (req, res) => {
    try {
        const newTransaction = await Transaction.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                transaction: newTransaction
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

// Actualizar una transacción
exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                transaction
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

// Eliminar una transacción
exports.deleteTransaction = async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};
