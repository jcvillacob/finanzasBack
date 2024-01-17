const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const Category = require('../models/Category');

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
        // Verificar si es una transferencia
        if (req.body.transferencia) {
            // Crear la primera transacción (gasto de la cuenta 1)
            const transaction1 = await Transaction.create({
                ...req.body,
                accountId: req.body.accountId1,
                categoryId: "65a7dc38c3882c7fcd303015"
            });

            const account1 = await Account.findById(req.body.accountId1);
            if (!account1) {
                throw new Error('Cuenta emisora no encontrada');
            }
            account1.balance -= req.body.amount;
            await account1.save();

            // Crear la segunda transacción (ingreso a la cuenta 2)
            const transaction2 = await Transaction.create({
                ...req.body,
                accountId: req.body.accountId2,
                categoryId: "65a7dc2bc3882c7fcd303012"
            });

            const account2 = await Account.findById(req.body.accountId2);
            if (!account2) {
                throw new Error('Cuenta receptora no encontrada');
            }
            account2.balance += req.body.amount;
            await account2.save();

            // Enviar respuesta con ambas transacciones
            res.status(201).json({
                status: 'success',
                data: {
                    transaction1: transaction1,
                    transaction2: transaction2
                }
            });
        } else {
            // Crear una transacción normal si no es una transferencia
            const newTransaction = await Transaction.create(req.body);

            const account = await Account.findById(req.body.accountId);
            const category = await Category.findById(req.body.categoryId);
            if (!account) {
                throw new Error('Cuenta no encontrada');
            }

            // Actualizar el saldo de la cuenta
            if (category.type === 'ingreso') {
                account.balance += req.body.amount;
            } else if (category.type === 'gasto') {
                account.balance -= req.body.amount;
            }

            await account.save();

            res.status(201).json({
                status: 'success',
                data: {
                    transaction: newTransaction
                }
            });
        }
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
        const transaction = await Transaction.findById(req.params.id);
        const category = await Category.findById(transaction.categoryId);
        if (!transaction) {
            throw new Error('Transacción no encontrada');
        }

        const account = await Account.findById(transaction.accountId);
        if (!account) {
            throw new Error('Cuenta no encontrada');
        }

        // Revertir el cambio original
        if (category.type === 'ingreso') {
            account.balance -= transaction.amount;
        } else if (category.type === 'gasto') {
            account.balance += transaction.amount;
        }

        // Aplicar el nuevo cambio
        if (category.type === 'ingreso') {
            account.balance += req.body.amount;
        } else if (category.type === 'gasto') {
            account.balance -= req.body.amount;
        }

        await account.save();

        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                transaction: updatedTransaction
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
        const transaction = await Transaction.findById(req.params.id);
        const category = await Category.findById(transaction.categoryId);
        if (!transaction) {
            throw new Error('Transacción no encontrada');
        }

        const account = await Account.findById(transaction.accountId);
        if (!account) {
            throw new Error('Cuenta no encontrada');
        }

        // Revertir el cambio
        if (category.type === 'ingreso') {
            account.balance -= transaction.amount;
        } else if (category.type === 'gasto') {
            account.balance += transaction.amount;
        }

        await account.save();

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