const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving products." });
  }
};

const addNewProduct = async (req, res) => {
  const { name, description, price, category, sizes, colors, stock } = req.body;
  if (!name || !description || !price || !category || !sizes || !colors)
    return res.status(400).json({ message: "all informations are required" });
  try {
    const result = await Product.create({
      name,
      description,
      price,
      category,
      sizes,
      colors,
      stock,
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (req, res) => {
  const { name, description, price, category, sizes, colors, stock } = req.body;
  if (!name || !description || !price || !category || !sizes || !colors)
    return res.status(400).json({ message: "all informations are required" });
  const product = await Product.findOne({ _id: req.params.id }).exec();
  if (!product) return res.status(400).json({ message: "product not found" });
  product.name = name;
  product.description = description;
  product.price = price;
  product.category = category;
  product.sizes = sizes;
  product.colors = colors;
  product.stock = stock;

  const result = await product.save();
  result.json(product);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id }).exec();
  if (!product) return res.status(404).json({ message: "product not found" });
  const result = await Product.deleteOne();
  res.json(result);
};

const getProduct = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "product ID required." });
  const product = await Product.findOne({ _id: req.params.id }).exec();
  if (!product) {
    return res
      .status(204)
      .json({ message: `No product matches ID ${req.params.id}.` });
  }
  res.json(product);
};

module.exports = {
  getAllProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};
