const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  title: String,
  price: Number,
  purchasedAt: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 2 },
  email:    { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  purchases: [PurchaseSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
