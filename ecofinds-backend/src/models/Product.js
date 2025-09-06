const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, index: true },
  price: { type: Number, required: true, min: 0 },
  imageUrl: { type: String, default: '/images/placeholder.jpg' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
