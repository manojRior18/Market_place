const Product = require('../models/Product');

exports.create = async (req, res) => {
  const { title, description, category, price, imageUrl } = req.body;
  const product = await Product.create({
    title, description, category, price, imageUrl, owner: req.user.id
  });
  res.status(201).json(product);
};

exports.list = async (req, res) => {
  const { category, q } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (q) filter.title = { $regex: q, $options: 'i' };
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
};

exports.mine = async (req, res) => {
  const products = await Product.find({ owner: req.user.id }).sort({ createdAt: -1 });
  res.json(products);
};

exports.getOne = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
};

exports.update = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  if (String(p.owner) !== req.user.id) return res.status(403).json({ message: 'Not your listing' });
  const { title, description, category, price, imageUrl } = req.body;
  p.title = title ?? p.title;
  p.description = description ?? p.description;
  p.category = category ?? p.category;
  p.price = price ?? p.price;
  p.imageUrl = imageUrl ?? p.imageUrl;
  await p.save();
  res.json(p);
};

exports.remove = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  if (String(p.owner) !== req.user.id) return res.status(403).json({ message: 'Not your listing' });
  await p.deleteOne();
  res.json({ ok: true });
};
