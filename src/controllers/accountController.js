const Account = require('../models/Account');

// Obtener todas las cuentas
exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json({
      status: 'success',
      data: {
        accounts
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

// Obtener una cuenta por ID
exports.getAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        account
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

// Crear una nueva cuenta
exports.createAccount = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        account: newAccount
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

// Actualizar una cuenta
exports.updateAccount = async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        account
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

// Eliminar una cuenta
exports.deleteAccount = async (req, res) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
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
