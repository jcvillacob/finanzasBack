const User = require('../models/User');

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({ status: 'success', data: { user: newUser } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error });
    }
};

// Controlador para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: 'success', data: { users } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error });
    }
};

// Controlador para obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ status: 'success', data: { user } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error });
    }
};

// Controlador para actualizar un usuario
exports.updateUser = async (req, res) => {
    try {
        // Actualiza y devuelve el nuevo documento
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({ status: 'success', data: { user: updatedUser } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error });
    }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error });
    }
};

