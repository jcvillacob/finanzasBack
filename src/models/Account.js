const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    color: { type: String, default: '#FFFFFF' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Account', accountSchema);