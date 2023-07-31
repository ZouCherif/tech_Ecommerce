const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// Add a product to the user's wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.userId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in the user's wishlist
    const existingWishlist = await Wishlist.findOne({ user });
    if (
      existingWishlist &&
      existingWishlist.products.some((p) => p.product.equals(productId))
    ) {
      return res
        .status(400)
        .json({ message: "Product already exists in wishlist" });
    }

    // If wishlist doesn't exist, create a new one for the user
    if (!existingWishlist) {
      const newWishlist = new Wishlist({ user, products: [] });
      await newWishlist.save();
    }

    // Add the product to the user's wishlist
    existingWishlist.products.push({ product: productId });
    await existingWishlist.save();

    res.json({ message: "Product added to wishlist successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product to wishlist" });
  }
};

// Remove a product from the user's wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.userId;

    const wishlist = await Wishlist.findOne({ user });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Remove the specified product from the wishlist
    wishlist.products = wishlist.products.filter(
      (p) => !p.product.equals(productId)
    );
    await wishlist.save();

    res.json({ message: "Product removed from wishlist successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing product from wishlist" });
  }
};

// Get the user's wishlist
const getWishlist = async (req, res) => {
  try {
    const user = req.userId;
    const wishlist = await Wishlist.findOne({ user }).populate(
      "products.product",
      "_id name price"
    );

    if (!wishlist) {
      return res.status(200).json({ message: "Wishlist is empty" });
    }

    res.json({ wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving wishlist" });
  }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };
