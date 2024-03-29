const Category = require("../models/Category");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(204).json({ message: "No categories found." });
    }
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving categories." });
  }
};

const addNewCategory = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).json({ message: "all informations are required" });
  try {
    const result = await Category.create({
      name,
      description,
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding new category." });
  }
};

const updateCategory = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).json({ message: "all informations are required" });

  try {
    const category = await Category.findOne({ _id: req.params.id }).exec();
    if (!category)
      return res.status(400).json({ message: "category not found" });
    category.name = name;
    category.description = description;
    const result = await category.save();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating category." });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id }).exec();
    if (!category)
      return res.status(404).json({ message: "category not found" });
    const result = await category.deleteOne();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting category." });
  }
};

module.exports = {
  getAllCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
};
