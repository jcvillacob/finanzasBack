const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ['ingreso', 'gasto'], required: true },
  createdAt: { type: Date, default: Date.now() }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
