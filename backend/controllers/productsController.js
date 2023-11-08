const Product = require("../models/Product");
const Category = require("../models/Category");

const getAllProducts = async (req, res) => {
  try {
    //for pagination i have to add  page and pageSize to req.query
    const { category, minPrice, maxPrice, color, search } = req.query;

    const filter = {};

    if (category) {
      const categoryId = await Category.find({ name: category }).select("_id");
      filter.category = categoryId;
    }
    if (minPrice && maxPrice) {
      filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    } else if (minPrice) {
      filter.price = { $gte: Number(minPrice) };
    } else if (maxPrice) {
      filter.price = { $lte: Number(maxPrice) };
    }

    if (color) {
      filter.colors = color;
    }

    if (search) {
      const regexSearch = new RegExp(search, "i");

      filter.$or = [
        { name: { $regex: regexSearch } },
        { description: { $regex: regexSearch } },
      ];
    }

    const products = await Product.find(filter);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving products." });
  }
};

// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     if (products.length === 0) {
//       return res.status(404).json({ message: "No products found." });
//     }
//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error retrieving products." });
//   }
// };

const addNewProduct = async (req, res) => {
  const { name, description, price, categoryName, colors, TotalStock } =
    req.body;
  if (!name || !description || !price || !categoryName)
    return res.status(400).json({ message: "all informations are required" });
  try {
    const category = await Category.findOne({ name: categoryName }).exec();
    if (!category)
      return json.status(404).json({ message: "Category not found" });
    const result = await Product.create({
      name,
      description,
      price,
      category: category._id,
      colors,
      TotalStock,
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (req, res) => {
  const { name, description, price, categoryName, colors, TotalStock } =
    req.body;
  if (!name || !description || !price || !categoryName || !sizes)
    return res.status(400).json({ message: "All information is required." });
  try {
    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product)
      return res.status(404).json({ message: "Product not found." });
    const category = await Category.findOne({ name: categoryName }).exec();
    if (!category)
      return res.status(404).json({ message: "Category not found." });
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category._id;
    product.colors = colors;
    product.TotalStock = TotalStock;
    const result = await product.save();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating product." });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product)
      return res.status(404).json({ message: "Product not found." });
    const result = await product.deleteOne();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product." });
  }
};

const getProduct = async (req, res) => {
  try {
    if (!req?.params?.id)
      return res.status(400).json({ message: "product ID required." });
    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) {
      return res
        .status(204)
        .json({ message: `No product matches ID ${req.params.id}.` });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error geting product." });
  }
};

module.exports = {
  getAllProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};
