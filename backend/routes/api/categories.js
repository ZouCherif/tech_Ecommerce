const express = require("express");
const router = express.Router();
const categoriesController = require("../../controllers/categoriesController");
const verifyUserRole = require("../../middlewares/verifyRole");
const verifyJWT = require("../../middlewares/verifyJWT");

router
  .route("/")
  .get(categoriesController.getAllCategories)
  .post(
    verifyJWT,
    verifyUserRole("admin"),
    categoriesController.addNewCategory
  );

router
  .route("/:id")
  //   .get(verifyUserRole("admin"), categoriesController.getProduct)
  .put(verifyJWT, verifyUserRole("admin"), categoriesController.updateCategory)
  .delete(
    verifyJWT,
    verifyUserRole("admin"),
    categoriesController.deleteCategory
  );

module.exports = router;
