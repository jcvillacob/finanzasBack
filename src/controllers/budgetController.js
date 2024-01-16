const Budget = require('../models/Budget');

// Obtener el presupuesto de un usuario
exports.getBudget = async (req, res) => {
  try {
    /* const budget = await Budget.findOne({ userId: req.user._id }); */
    const budget = await Budget.findOne({ userId: req.params.id });
    res.status(200).json({
      status: 'success',
      data: {
        budget
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

// Crear o actualizar el presupuesto de un usuario
exports.createOrUpdateBudget = async (req, res) => {
  try {
    /* const existingBudget = await Budget.findOne({ userId: req.user._id }); */
    const existingBudget = await Budget.findOne({ userId: req.body.user });
    let budget;
    if (existingBudget) {
      // Actualizar el presupuesto existente
      budget = await Budget.findOneAndUpdate({ userId: req.body.user }, req.body, {
        new: true,
        runValidators: true
      });
    } else {
      // Crear un nuevo presupuesto
      budget = await Budget.create({ ...req.body, userId: req.body.user });
    }
    res.status(200).json({
      status: 'success',
      data: {
        budget
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

// Eliminar el presupuesto de un usuario
exports.deleteBudget = async (req, res) => {
  try {
    await Budget.findOneAndDelete({ userId: req.body.user });
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
