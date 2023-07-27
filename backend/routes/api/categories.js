const express = require("express");
const router = express.Router();
const categoriesController = require("../../controllers/categoriesController");
const verifyUserRole = require("../../middlewares/verifyRole");

router
  .route("/")
  .get(categoriesController.getAllCategories)
  .post(verifyUserRole("admin"), categoriesController.addNewCategory);

router
  .route("/:id")
  //   .get(verifyUserRole("admin"), categoriesController.getProduct)
  .put(verifyUserRole("admin"), categoriesController.updateCategory)
  .delete(verifyUserRole("admin"), categoriesController.deleteCategory);

module.exports = router;
