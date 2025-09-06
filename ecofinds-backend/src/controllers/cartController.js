const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
}

exports.getCart = async (req, res) => {
  const cart = await getOrCreateCart(req.user.id);
  res.json(cart);
};

exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const cart = await getOrCreateCart(req.user.id);
  const exists = cart.items.find(i => String(i.product) === String(productId));
  if (!exists) cart.items.push({ product: productId });
  await cart.save();
  const populated = await Cart.findById(cart._id).populate('items.product');
  res.status(201).json(populated);
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const cart = await getOrCreateCart(req.user.id);
  cart.items = cart.items.filter(i => String(i.product) !== String(productId));
  await cart.save();
  const populated = await Cart.findById(cart._id).populate('items.product');
  res.json(populated);
};

exports.checkout = async (req, res) => {
  const cart = await getOrCreateCart(req.user.id);
  const user = await User.findById(req.user.id);
  const purchases = cart.items.map(i => ({
    product: i.product._id || i.product,
    title: i.product.title ?? undefined,
    price: i.product.price ?? undefined
  }));
  user.purchases.push(...purchases);
  await user.save();
  cart.items = [];
  await cart.save();
  res.json({ ok: true, purchases: user.purchases });
};
